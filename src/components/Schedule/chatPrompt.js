import React, { useState } from 'react';
import Input from './utils/input';
// import Button from './utils/button';
import { AddButton } from './utils/button';

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
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task or event..."
                className="flex-1"
            />
            <AddButton type="submit">Add</AddButton>
        </form>
    );
}

