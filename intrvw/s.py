import os
import wave
import pyaudio
import threading
import json
from pynput import keyboard
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Re-route environmental load explicitly to the backend framework path
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "temp_fastapi_backend", ".env")
load_dotenv(env_path)

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print(f"FATAL: GEMINI_API_KEY not found at {env_path}")
    exit(1)

client = genai.Client(api_key=api_key)

CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000 # 16kHz is ideal for fast voice AI transcription

INTERVIEW_FILE = "/Users/nishantsaxena/workspace/resume/intrvw/q.txt"
ANSWER_FILE = "/Users/nishantsaxena/workspace/resume/intrvw/a.txt"

is_recording = False
frames = []
p = None
stream = None

# Track pressed keys natively to identify combination holds
pressed_keys = set()
recording_lock = threading.Lock()
handled_clear = False
handled_trigger = False

def is_combo_active():
    has_shift = any(k in pressed_keys for k in [keyboard.Key.shift, keyboard.Key.shift_l, keyboard.Key.shift_r])
    # Mac users often use CMD instead of CTRL, we will accept either to be safe.
    has_ctrl = any(k in pressed_keys for k in [keyboard.Key.ctrl, keyboard.Key.ctrl_l, keyboard.Key.ctrl_r, keyboard.Key.cmd, keyboard.Key.cmd_l, keyboard.Key.cmd_r])
    has_1 = False
    for k in pressed_keys:
        char_val = getattr(k, 'char', None)
        vk_val = getattr(k, 'vk', None)
        # When SHIFT is held down, pressing 1 outputs '!' on macOS.
        if char_val in ('1', '!', '¡'):
            has_1 = True
            break
        elif vk_val in (18, 19): # 18 is '1' on Mac ANSI keyboards
            has_1 = True
            break
    return has_shift and has_ctrl and has_1

def is_trigger_active():
    has_opt = any(k in pressed_keys for k in [keyboard.Key.alt, keyboard.Key.alt_l, keyboard.Key.alt_r])
    has_spc = any(k in pressed_keys for k in [keyboard.Key.space])
    return has_opt and has_spc

def is_clear_active():
    has_shift = any(k in pressed_keys for k in [keyboard.Key.shift, keyboard.Key.shift_l, keyboard.Key.shift_r])
    has_ctrl = any(k in pressed_keys for k in [keyboard.Key.ctrl, keyboard.Key.ctrl_l, keyboard.Key.ctrl_r, keyboard.Key.cmd, keyboard.Key.cmd_l, keyboard.Key.cmd_r])
    has_q = False
    for k in pressed_keys:
        char_val = getattr(k, 'char', None)
        vk_val = getattr(k, 'vk', None)
        if char_val in ('q', 'Q', 'œ'):
            has_q = True
            break
        elif vk_val == 12: # 12 is 'Q' on macOS ANSI
            has_q = True
            break
    return has_shift and has_ctrl and has_q

def clear_notes():
    try:
        with open(INTERVIEW_FILE, "w") as f:
            f.write("=== SUBMITTED QUESTIONS LOG ===\n\n")
        with open(ANSWER_FILE, "w") as f:
            f.write("=== COPILOT ANSWERS LOG ===\n\n")
        print(f"\n[🗑️ CLEAR] SHIFT+CTRL+Q detected! Scrubbed q.txt and a.txt.")
    except Exception as e:
        print(f"Error scrubbing file: {e}")

def start_recording():
    global is_recording, frames, p, stream
    with recording_lock:
        if is_recording: return
        print(f"\n[🔴 REC] SHIFT+CTRL+1 detected! Recording microphone buffer...")
        is_recording = True
        frames = []
        
        try:
            p = pyaudio.PyAudio()
            stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
            
            def record():
                global p, stream
                # Safely buffer audio while hotkey is held
                while is_recording:
                    try:
                        data = stream.read(CHUNK, exception_on_overflow=False)
                        frames.append(data)
                    except Exception:
                        pass
                
                # Executed natively when is_recording flips to False via stop_recording
                print("\n[⏹️ STOP] Hotkey unlatched. Bundling WAV payload securely...")
                try:
                    if stream:
                        stream.stop_stream()
                        stream.close()
                    if p:
                        p.terminate()
                        
                    filename = "/Users/nishantsaxena/workspace/resume/intrvw/util/temp_capture.wav"
                    wf = wave.open(filename, 'wb')
                    wf.setnchannels(CHANNELS)
                    wf.setsampwidth(p.get_sample_size(FORMAT))
                    wf.setframerate(RATE)
                    wf.writeframes(b''.join(frames))
                    wf.close()
                    
                    # Offload to AI pipeline
                    threading.Thread(target=process_audio_buffer, args=(filename,), daemon=True).start()
                except Exception as e:
                    print(f"I/O Finalization Error: {e}")
                finally:
                    stream = None
                    p = None

            threading.Thread(target=record, daemon=True).start()
        except Exception as e:
            print(f"Audio Port Error: {e} - Ensure microphone permissions are granted!")
            is_recording = False

def process_audio_buffer(filename):
    print("[🧠] Transcribing audio buffer via Gemini 2.5 Flash to q.txt...")
    try:
        with open(filename, "rb") as f:
            audio_bytes = f.read()

        prompt = """
        You are an elite Software Engineering Copilot transcription engine. 
        Listen to this recorded audio snippet. 
        Analyze the audio and return ONLY the verbatim interview QUESTION being asked. 
        Do not try to answer the question. Do not include conversational fluff.
        Return raw text of the question only.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_bytes(data=audio_bytes, mime_type='audio/wav'),
                prompt
            ]
        )
        
        q_text = response.text.strip()
            
        print("\n" + "="*50)
        print(f"🎙️ Q: {q_text}")
        print("="*50 + "\n")
        
        with open(INTERVIEW_FILE, "a") as f:
            f.write(f"[Q]: {q_text}\n\n")
            
        print(f"✅ Question successfully transcribed into q.txt!")
    except Exception as e:
        print(f"Transcription Pipeline Error: {e}")

def generate_answer():
    print("\n[🚀 EXECUTE] OPTION+SPACE detected! Generating answer from q.txt...")
    try:
        with open(INTERVIEW_FILE, "r") as f:
            question_context = f.read().strip()
            
        if not question_context or "READY: LISTENING" in question_context and len(question_context) < 60:
            print("⚠️ No valid questions found in q.txt yet! Record something first.")
            return

        prompt = f"""
        You are an elite, highly technical Software Engineering Interview Copilot.
        Here is the transcribed log of the interview so far:
        
        {question_context}
        
        Look at the VERY LAST question in this log. Provide a direct, highly technical, and concise INTERVIEW ANSWER designed to address that specific final question.
        Use bullet points. Do not include conversational fluff or pleasantries. Return the naked technical answer.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt]
        )
        
        a_text = response.text.strip()
        
        print("\n" + "="*50)
        print(f"🧠 A:\n{a_text}")
        print("="*50 + "\n")
        
        with open(ANSWER_FILE, "w") as f: # Overwrite answer file with latest answer for clarity
            f.write(f"=== LATEST COPILOT ANSWER ===\n{a_text}\n\n")
            
        print(f"✅ Answer synthesized and populated directly into a.txt!")
        
    except Exception as e:
        print(f"Generation Pipeline Error: {e}")

def stop_recording():
    global is_recording
    with recording_lock:
        if not is_recording: return
        # Setting this to False allows the background 'record' thread to gracefully close the stream and save the file.
        is_recording = False

def on_press(key):
    global handled_clear, handled_trigger
    pressed_keys.add(key)
    
    # Check for Record Command
    if is_combo_active() and not is_recording:
        start_recording()
        
    # Check for Generate Answer Command
    if is_trigger_active() and not handled_trigger:
        generate_answer()
        handled_trigger = True
        
    # Check for Clear Command
    if is_clear_active() and not handled_clear:
        clear_notes()
        handled_clear = True

def on_release(key):
    global handled_clear, handled_trigger
    was_active = is_combo_active()
    if key in pressed_keys:
        pressed_keys.remove(key)
        
    if was_active and not is_combo_active() and is_recording:
        stop_recording()
        
    if not is_clear_active():
        handled_clear = False
        
    if not is_trigger_active():
        handled_trigger = False

if __name__ == "__main__":
    out_dir = "/Users/nishantsaxena/workspace/resume/intrvw/util"
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    # Ensure the target text files are primed and exist upon launch
    if not os.path.exists(INTERVIEW_FILE):
        with open(INTERVIEW_FILE, "w") as f:
            f.write("=== READY: LISTENING FOR INTERVIEW QUESTIONS ===\n\n")
            
    print("========================================")
    print("🎧 AUDIO COPILOT SNIFFER - INITIALIZED")
    print(f"Output Matrix: {os.path.dirname(INTERVIEW_FILE)}/")
    print("========================================")
    print("1. HOLD: SHIFT + CTRL + 1 to Transcribe Audio directly into 'q.txt'.")
    print("2. PRESS: OPTION + SPACE to read 'q.txt' and synthesize an AI Response into 'a.txt'.")
    print("3. PRESS: SHIFT + CTRL + Q to instantly wipe 'q.txt' and 'a.txt'.")
    print("========================================\n")
    print("⏳ Listening in background...")
    
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()
