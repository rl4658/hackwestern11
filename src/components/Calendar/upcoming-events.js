"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../../css/calendar.css";

export function UpcomingEvents({ onEdit, onTaskUpdate, addedTask }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Sample events for demonstration
    const sampleEvents = [
      {
        id: "1",
        name: "Team Meeting",
        date: "2024-12-05",
        startTime: "10:00",
        endTime: "11:00",
        note: "Discuss Q1 roadmap",
        color: "#3b82f6",
      },
      {
        id: "2",
        name: "Project Deadline",
        date: "2024-12-07",
        startTime: "18:00",
        endTime: "19:00",
        note: "Finalize the design",
        color: "#10b981",
      },
      {
        id: "3",
        name: "Client Call",
        date: "2024-12-06",
        startTime: "14:30",
        endTime: "15:30",
        note: "Discuss project updates",
        color: "#ef4444",
      },
    ];
    setEvents(sampleEvents);
  }, []);

  // Add newly added task to upcoming events
  useEffect(() => {
    if (addedTask) {
      setEvents((prevEvents) => [...prevEvents, addedTask]);
    }
  }, [addedTask]);

  const handleEdit = (event) => {
    setSelectedEvent(event); // Open the edit form with the event details
    onEdit?.(event); // Pass to parent component if needed
  };

  const saveEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setSelectedEvent(null); // Close the edit form

    if (onTaskUpdate) {
      onTaskUpdate(updatedEvent); // Pass the updated event to the parent for calendar update
    }
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
    setSelectedEvent(null); // Close the edit form
  };

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-header">
        <h2 className="upcoming-events-title">Upcoming Events</h2>
      </div>
      {/* Events List */}
      <div className="events-list-container">
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
                    {format(new Date(event.date), "MMM d, yyyy")} |{" "}
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
                <button
                  className="edit-event-button"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Edit Task Form in Right Sidebar */}
      <div className="edit-task-right-sidebar">
        {selectedEvent && (
          <EventEditForm
            event={selectedEvent}
            onSave={saveEvent}
            onDelete={deleteEvent}
            onCancel={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
}

function EventEditForm({ event, onSave, onDelete, onCancel }) {
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [note, setNote] = useState(event.note);
  const [color, setColor] = useState(event.color);

  const handleSave = () => {
    const updatedEvent = { ...event, name, date, startTime, endTime, note, color };
    onSave(updatedEvent);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the task "${event.name}"?`
    );
    if (confirmDelete) {
      onDelete(event.id);
    }
  };

  return (
    <div className="edit-task-container">
      <h3 className="edit-task-title">Update Task</h3>
      <form className="edit-task-form">
        <label>
          Task Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Start Time
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End Time
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Notes
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </label>
        <label>
          Color
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpcomingEvents;
