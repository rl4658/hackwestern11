import React, { useState } from 'react';

export default function ChatPrompt({ onSubmit }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 bg-gray-100 p-4 overflow-y-auto border border-gray-300 rounded-md">
                {/* Chat messages could be rendered here */}
                <div className="text-gray-500 text-center italic">
                    Chatbox will display incoming messages here.
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
