import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function SelectedSchedule({ schedule }) {
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
