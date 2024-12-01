import React, { useState, useRef } from 'react';
import SelectedSchedule from './SelectedSchedule';
import GeneratedSchedules from './GeneratedSchedules';
import ChatPrompt from './chatPrompt';
import Input from './utils/input';
import { ExportButton, AddButton, GenerateButton } from './utils/button';
import { parseJsonSchedule, generateScheduleFromPrompt, generateUniqueSchedules } from './utils/ScheduleUtils';

export default function WeeklyScheduleOrganizer() {
    const [selectedSchedule, setSelectedSchedule] = useState(null); // The currently selected schedule
    const [generatedSchedules, setGeneratedSchedules] = useState([]); // List of generated schedules
    const [allSchedules, setAllSchedules] = useState([]); // All schedules (includes imported or generated)
    const fileInputRef = useRef(null); // Ref for the file input

    // Handles generating 5 unique schedules
    const handleGenerate = () => {
        const newSchedules = generateUniqueSchedules(5, allSchedules);
        setGeneratedSchedules(newSchedules);
        setAllSchedules([...allSchedules, ...newSchedules]);
    };

    // Handles exporting the selected schedule as JSON
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

    // Handles importing a schedule from a JSON file
    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedSchedule = parseJsonSchedule(e.target.result);
                    if (importedSchedule) {
                        setSelectedSchedule(importedSchedule);
                        setGeneratedSchedules([importedSchedule, ...generatedSchedules.slice(0, 4)]);
                        setAllSchedules([importedSchedule, ...allSchedules]);
                    }
                } catch (error) {
                    alert('Invalid JSON file. Please check the file content.');
                }
            };
            reader.readAsText(file);
        }
    };

    // Handles adding a task via prompt
    const handlePromptSubmit = (prompt) => {
        const newSchedule = generateScheduleFromPrompt(prompt);
        setSelectedSchedule(newSchedule);
        setGeneratedSchedules([newSchedule, ...generatedSchedules.slice(0, 4)]);
        setAllSchedules([newSchedule, ...allSchedules]);
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Upper Section */}
            <div className="h-1/2 p-4 relative">
                <SelectedSchedule schedule={selectedSchedule} />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Import
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImport}
                        accept=".json"
                        className="hidden"
                    />
                    <ExportButton selectedSchedule={selectedSchedule} />
                </div>
            </div>

            {/* Lower Section */}
            <div className="h-1/2 flex flex-col">
                <GeneratedSchedules
                    schedules={generatedSchedules}
                    onSelectSchedule={setSelectedSchedule}
                />
                <div className="flex justify-between items-center p-4">
                    <ChatPrompt onSubmit={handlePromptSubmit} />
                    <div className="flex gap-2">
                        <GenerateButton onGenerate={handleGenerate} />
                        <AddButton
                            onAddTask={(taskPrompt) => {
                                const updatedSchedule = { ...selectedSchedule };
                                // Assuming a day and time are parsed from the prompt
                                const [day, time] = taskPrompt.split(':');
                                if (!updatedSchedule[day]) {
                                    updatedSchedule[day] = {};
                                }
                                updatedSchedule[day][time] = taskPrompt;
                                setSelectedSchedule(updatedSchedule);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
