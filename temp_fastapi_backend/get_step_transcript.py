from youtube_transcript_api import YouTubeTranscriptApi
import sys

video_id = "GVpmVu8vcNQ"
try:
    transcript = YouTubeTranscriptApi().fetch(video_id)
    transcript_text = "\n".join([f"[{t['start']}s] {t['text']}" for t in transcript])
    print("_TRANSCRIPT_START_")
    if len(transcript_text) > 4000:
        print(transcript_text[:2000] + "\n... [TRUNCATED] ...\n" + transcript_text[-2000:])
    else:
        print(transcript_text)
    print("_TRANSCRIPT_END_")
except Exception as e:
    print(f"Error: {e}")
