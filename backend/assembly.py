import assemblyai as aai

aai.settings.api_key = "a128924ed49246269fa7f42d269ea26c"

def transcribe(message):

    transcriber = aai.Transcriber()

    transcript = transcriber.transcribe(message)

    return transcript

"""
transcriber = aai.Transcriber()

transcript = transcriber.transcribe("https://assembly.ai/news.mp4")
# transcript = transcriber.transcribe("./my-local-audio-file.wav")

print(transcript.text)

"""