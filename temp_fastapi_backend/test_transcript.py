from youtube_transcript_api import YouTubeTranscriptApi
transcript = YouTubeTranscriptApi().fetch('zCIpWFYDJ8s')
transcript_text = "\n".join([f"[{t.start}s] {t.text}" for t in transcript])
print(transcript_text[:200])
