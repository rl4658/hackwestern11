import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
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
    const [textInput, setTextInput] = useState(""); // Text input for additional info
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

    // Handles generating the calendar by sending input text to backend
    const handleGenerateCalendar = async () => {
        if (!textInput) {
            alert("Please enter a query to generate a calendar");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/process_query', {
                query: textInput,
            });
            
            // Update generated schedules with response data
            if (response.data && response.data.schedules) {
                setGeneratedSchedules(response.data.schedules);
                setAllSchedules([...allSchedules, ...response.data.schedules]);
            }
        } catch (error) {
            console.error("Error generating calendar:", error);
            alert("There was an error generating the calendar. Please try again.");
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Upper Section */}
            <div className="h-1/2 p-4 relative">
                <SelectedSchedule schedule={selectedSchedule} />
                <div className="absolute bottom-4 right-4 flex gap-2 items-center">
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Enter info..."
                        className="px-4 py-2 border rounded focus:outline-none focus:ring"
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleGenerateCalendar}
                    >
                        Generate Calendar
                    </button>
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
