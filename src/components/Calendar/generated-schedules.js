import { useState } from "react";
import Button from "./ui/button"; // Fixed import for Button
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"; // Fixed import for Dialog components
import "../../css/calendar.css";

export default function GeneratedSchedules() {
    const [schedules, setSchedules] = useState([]); // Replace with actual schedules if needed
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const viewDetails = (schedule) => {
        setSelectedSchedule(schedule);
    };

    return (
        <div className="generated-schedules-container">
            <h2 className="generated-schedules-heading">Generated Schedules</h2>
            {schedules.length === 0 ? (
                <p>No schedules generated yet.</p>
            ) : (
                <ul className="generated-schedules-list">
                    {schedules.map((schedule) => (
                        <li
                            key={schedule.id}
                            className="generated-schedule-item"
                        >
                            <span>{schedule.summary}</span>
                            <Button onClick={() => viewDetails(schedule)}>
                                View Details
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            <Dialog
                open={!!selectedSchedule}
                onOpenChange={() => setSelectedSchedule(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Schedule Details</DialogTitle>
                    </DialogHeader>
                    <div className="schedule-details">
                        <p>{selectedSchedule?.details}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
