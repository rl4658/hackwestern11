// src/components/Schedule/WeeklyScheduleOrganizer.js

import React, { useState, useRef } from 'react';
import SelectedSchedule from './SelectedSchedule';
import GeneratedSchedules from './GeneratedSchedules';
import ChatPrompt from './chatPrompt';
import Input from './utils/input';
import { ExportButton, AddButton, GenerateButton } from './utils/button';
import { parseJsonSchedule, generateScheduleFromPrompt, generateUniqueSchedules } from './utils/ScheduleUtils';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export default function WeeklyScheduleOrganizer() {
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [generatedSchedules, setGeneratedSchedules] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);
    const fileInputRef = useRef(null);

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedSchedules = parseJsonSchedule(e.target.result);
                    if (importedSchedules) {
                        const schedulesWithIds = importedSchedules.map((schedule) => ({
                            ...schedule,
                            id: uuidv4(),
                        }));

                        setGeneratedSchedules(schedulesWithIds);
                        setAllSchedules([...allSchedules, ...schedulesWithIds]);
                        setSelectedSchedule(schedulesWithIds[0]);
                    }
                } catch (error) {
                    alert('Invalid JSON file. Please check the file content.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleGenerate = () => {
        const newSchedules = generateUniqueSchedules(5, allSchedules);
        setGeneratedSchedules(newSchedules);
        setAllSchedules([...allSchedules, ...newSchedules]);
    };

    const handlePromptSubmit = (prompt) => {
        const newSchedule = generateScheduleFromPrompt(prompt);
        newSchedule.id = uuidv4();
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
                                const [day, time, taskName] = taskPrompt.split(':');
                                const hour = parseInt(time, 10);

                                const updatedSchedule = { ...selectedSchedule };

                                if (!updatedSchedule[day]) {
                                    updatedSchedule[day] = {};
                                }
                                updatedSchedule[day][hour] = taskName;

                                // Ensure the ID is carried over
                                updatedSchedule.id = selectedSchedule.id;

                                setSelectedSchedule(updatedSchedule);

                                // Update allSchedules
                                setAllSchedules((prevSchedules) =>
                                    prevSchedules.map((schedule) =>
                                        schedule.id === selectedSchedule.id ? updatedSchedule : schedule
                                    )
                                );

                                // Update generatedSchedules
                                setGeneratedSchedules((prevSchedules) =>
                                    prevSchedules.map((schedule) =>
                                        schedule.id === selectedSchedule.id ? updatedSchedule : schedule
                                    )
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
