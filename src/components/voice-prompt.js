import React, { useState } from 'react'
import { Button } from "@mui/material"
import { Mic } from 'lucide-react'

export function VoicePrompt() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const toggleListening = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false)
    } else {
      // Start listening
      setIsListening(true)
      // Implement speech recognition here
    }
  }

  return (
    <div className="mt-4">
      <Button onClick={toggleListening} variant={isListening ? 'destructive' : 'default'}>
        <Mic className="mr-2 h-4 w-4" />
        {isListening ? 'Stop Listening' : 'Start Voice Input'}
      </Button>
      {isListening && <p className="mt-2 text-sm">Listening...</p>}
      {transcript && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  )
}

