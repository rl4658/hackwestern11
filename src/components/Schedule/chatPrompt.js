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
        <>
           
        </>
    );
}

