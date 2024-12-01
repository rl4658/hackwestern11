import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SelectedSchedule from './SelectedSchedule';
import ChatPrompt from './chatPrompt';
import { v4 as uuidv4 } from 'uuid';
import { ExportButton, AddButton, GenerateButton } from './utils/button';
import { convertTasksToSchedule } from './utils/ScheduleUtils';

export default function WeeklyScheduleOrganizer() {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [generatedSchedules, setGeneratedSchedules] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Initialize with empty schedules or fetch from a default source if needed
    setGeneratedSchedules([]);
    setAllSchedules([]);
  }, []);

  const handlePromptSubmit = async (prompt) => {
    try {
      // Send the prompt to the Flask API
      const response = await axios.post('http://localhost:5000/process_query', {
        query: prompt,
      });

      const { schedules } = response.data;

      if (!schedules || !Array.isArray(schedules)) {
        throw new Error('Invalid response from server');
      }

      // Convert tasks to the schedule format
      const importedSchedules = schedules.map((scheduleTasks) =>
        convertTasksToSchedule(scheduleTasks)
      );

      // Add unique IDs to each schedule
      const schedulesWithIds = importedSchedules.map((schedule) => ({
        ...schedule,
        id: uuidv4(),
      }));

      // Update state with the new schedules
      setGeneratedSchedules(schedulesWithIds);
      setAllSchedules(schedulesWithIds);
      setSelectedSchedule(schedulesWithIds[0]);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      alert('Failed to fetch schedules. Please try again.');
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSchedules = JSON.parse(e.target.result);
          const schedulesWithIds = importedSchedules.map((schedule) => ({
            ...schedule,
            id: uuidv4(),
          }));
          setGeneratedSchedules(schedulesWithIds);
          setAllSchedules([...allSchedules, ...schedulesWithIds]);
          setSelectedSchedule(schedulesWithIds[0]);
        } catch (error) {
          alert('Invalid JSON file. Please check the file content.');
        }
      };
      reader.readAsText(file);
    }
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
      <div className="h-1/2 flex flex-col p-4">
        {/* Buttons to switch between schedules */}
        <div className="flex gap-4 mb-4">
          {generatedSchedules.map((schedule, index) => (
            <button
              key={schedule.id}
              className={`px-4 py-2 rounded ${
                selectedSchedule?.id === schedule.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              onClick={() => setSelectedSchedule(schedule)}
            >
              Schedule {index + 1}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <ChatPrompt onSubmit={handlePromptSubmit} />
          <div className="flex gap-2">
            <GenerateButton
              onGenerate={() =>
                alert('Generate function is not implemented yet.')
              }
            />
            <AddButton
              onAddTask={(taskPrompt) => {
                const [day, time, taskName] = taskPrompt.split(':');
                const hour = parseInt(time, 10);

                const updatedSchedule = { ...selectedSchedule };

                if (!updatedSchedule[day]) {
                  updatedSchedule[day] = {};
                }
                updatedSchedule[day][hour] = taskName;

                updatedSchedule.id = selectedSchedule.id;

                setSelectedSchedule(updatedSchedule);

                setAllSchedules((prevSchedules) =>
                  prevSchedules.map((schedule) =>
                    schedule.id === selectedSchedule.id
                      ? updatedSchedule
                      : schedule
                  )
                );

                setGeneratedSchedules((prevSchedules) =>
                  prevSchedules.map((schedule) =>
                    schedule.id === selectedSchedule.id
                      ? updatedSchedule
                      : schedule
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
