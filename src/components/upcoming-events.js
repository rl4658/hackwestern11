"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Button from "./ui/button";
import "../css/calendar.css";

export function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Sample events for demonstration
    const sampleEvents = [
      { id: "1", name: "Team Meeting", date: new Date(2024, 11, 5, 10, 0) },
      { id: "2", name: "Project Deadline", date: new Date(2024, 11, 7, 18, 0) },
      { id: "3", name: "Client Call", date: new Date(2024, 11, 6, 14, 30) },
    ];
    setEvents(sampleEvents);
  }, []);

  const addEvent = () => {
    const newEvent = {
      id: String(events.length + 1),
      name: "New Event",
      date: new Date(),
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-header">
        <h2 className="upcoming-events-title">Upcoming Events</h2>
        <Button onClick={addEvent} className="add-event-button">
          Add Event
        </Button>
      </div>
      {events.length === 0 ? (
        <p className="empty-events-message">
          No upcoming events. Add one above!
        </p>
      ) : (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <div>
                <div className="event-name">{event.name}</div>
                <div className="event-date">
                  {format(event.date, "MMM d, yyyy h:mm a")}
                </div>
              </div>
              <Button
                variant="ghost"
                className="remove-event-button"
                onClick={() =>
                  setEvents((prevEvents) =>
                    prevEvents.filter((e) => e.id !== event.id),
                  )
                }
                aria-label={`Remove ${event.name}`}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingEvents;
