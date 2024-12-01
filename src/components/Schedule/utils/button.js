import React from 'react';

export function ExportButton({ selectedSchedule }) {
    const handleExport = () => {
        if (selectedSchedule) {
            const jsonString = JSON.stringify(selectedSchedule, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = 'weekly-schedule.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('No schedule selected to export!');
        }
    };

    return (
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleExport}
        >
            Export
        </button>
    );
}

export function AddButton({ onAddTask }) {
    const handleAddTask = () => {
        const prompt = prompt('Enter a task in the format "Day:Time:Task" (e.g., "Monday:10:Meeting")');
        if (prompt && onAddTask) {
            onAddTask(prompt);
        }
    };

    return (
        <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleAddTask}
        >
            Add
        </button>
    );
}

export function GenerateButton({ onGenerate }) {
    const handleGenerate = () => {
        if (onGenerate) {
            onGenerate();
        }
    };

    return (
        <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={handleGenerate}
        >
            Generate
        </button>
    );
}