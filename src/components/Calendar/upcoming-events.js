"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import "../../css/calendar.css";

export function UpcomingEvents({ tasks, onTaskUpdate }) {
  // Sort tasks by date and time
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateComparison = new Date(a.date) - new Date(b.date);
    if (dateComparison !== 0) return dateComparison;
    return a.startTime.localeCompare(b.startTime); // Sort by time if dates are equal
  });

  const [selectedEvent, setSelectedEvent] = useState(null); // Holds the event being edited

  const handleEdit = (event) => {
    setSelectedEvent(event); // Open the edit form with the event details
  };

  const saveEvent = (updatedEvent) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedEvent.id ? updatedEvent : task
    );
    onTaskUpdate(updatedTasks); // Update the parent state
    setSelectedEvent(null); // Close the edit form
  };

  const deleteEvent = (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    if (confirmDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== eventId);
      onTaskUpdate(updatedTasks); // Update the parent state
      setSelectedEvent(null); // Close the edit form
    }
  };

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-header">
        <h2 className="upcoming-events-title">Upcoming Events</h2>
      </div>
      {/* Events List */}
      <div className="events-list-container">
        {sortedTasks.length === 0 ? (
          <p className="empty-events-message">
            No upcoming events. Add one above!
          </p>
        ) : (
          <ul className="events-list">
            {sortedTasks.map((event) => (
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

      {/* Edit Task Form */}
      {selectedEvent && (
        <div className="edit-task-right-sidebar">
          <EventEditForm
            event={selectedEvent}
            onSave={saveEvent}
            onDelete={deleteEvent}
            onCancel={() => setSelectedEvent(null)}
          />
        </div>
      )}
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
    if (!name || !date || !startTime || !endTime) {
      alert("Please fill in all required fields!");
      return;
    }

    const updatedEvent = { ...event, name, date, startTime, endTime, note, color };
    onSave(updatedEvent); // Save the updated task
  };

  const handleDelete = () => {
    onDelete(event.id); // Confirm and delete the task
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
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpcomingEvents;
