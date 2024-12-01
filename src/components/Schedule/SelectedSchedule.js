// src/components/Schedule/SelectedSchedule.js

import React, { useEffect } from 'react';

// Adjust the DAYS array to match the actual days in your schedule data
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function SelectedSchedule({ schedule }) {
  useEffect(() => {
    // This will log whenever the schedule prop changes, helping you verify updates
    console.log('Selected schedule updated:', schedule);
  }, [schedule]);

  if (!schedule) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a schedule to view details
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {DAYS.map((day) => (
              <th key={day} className="border p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <tr key={hour}>
              <td className="border p-2">{`${hour.toString().padStart(2, '0')}:00`}</td>
              {DAYS.map((day) => (
                <td key={`${day}-${hour}`} className="border p-2">
                  {schedule[day]?.[hour] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
