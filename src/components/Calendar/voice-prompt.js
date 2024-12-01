"use client";
import React, { useState } from "react";
import Button from "./ui/button";
import { Mic, MicOff } from "lucide-react";
import "../../css/calendar.css";

export function VoicePrompt() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript((prev) => `${prev}\n${speechToText}`);
      };

      recognition.onerror = (event) => {
        setError(event.error);
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      setError("Speech recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.abort();
    }
    setIsListening(false);
  };

  return (
    <div className="voice-prompt-container">
      <Button
        onClick={toggleListening}
        variant={isListening ? "destructive" : "default"}
      >
        {isListening ? (
          <MicOff className="mr-2 h-4 w-4" />
        ) : (
          <Mic className="mr-2 h-4 w-4" />
        )}
        {isListening ? "Stop Listening" : "Start Voice Input"}
      </Button>
      {isListening && <p className="listening-message">Listening...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {transcript && (
        <div className="transcript-container">
          <h3 className="transcript-heading">Transcript:</h3>
          <p className="transcript-text">{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default VoicePrompt;
