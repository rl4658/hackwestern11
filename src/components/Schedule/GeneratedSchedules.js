import React from 'react';

export default function GeneratedSchedules({ schedules, onSelectSchedule }) {
    return (
        <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-5 gap-2 p-2">
                {schedules.map((schedule, index) => (
                    <div
                        key={index}
                        className="border rounded p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectSchedule(schedule)}
                    >
                        Schedule {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}
