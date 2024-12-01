import requests
import os
import mimetypes
from assembly import transcribe
import os
import mimetypes

def is_mp4_file(file):
    if file.lower().endswith(".mp4"):
        return True
    else:
        return False

api_key = "VF.DM.674b5b1b163f9c61b2117f3b.j9AFaN5sRAca7B4F"

# user_id defines who is having the conversation, e.g. steve, john.doe@gmail.com, username_464
def interact(user_id, request):
    response = requests.post(
        f'https://general-runtime.voiceflow.com/state/user/{user_id}/interact',
        json={ 'request': request },
        headers={ 'Authorization': api_key },
    )

    for trace in response.json():
        if trace['type'] == 'speak' or trace['type'] == 'text':
            print(trace['payload']['message'])
        elif trace['type'] == 'end':
            # an end trace means the the voiceflow dialog has ended
            return False
    return True

name = input('> What is your name?\n')
isRunning = interact(name, { 'type': 'launch' })

while (isRunning):
    nextInput = input('> Say something\n')

    if (is_mp4_file(nextInput)):
        transcript = transcribe(nextInput)
    else:
        transcript = nextInput

    # send a simple text type request with the user input
    isRunning = interact(name, { 'type': 'text', 'payload': transcript })

#input('Thank you!')