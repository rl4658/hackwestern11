'use client'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

export function UpcomingEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    // This is where you would fetch the actual events from your data source
    const sampleEvents = [
      { id: '1', name: 'Team Meeting', date: new Date(2023, 5, 15, 10, 0) },
      { id: '2', name: 'Project Deadline', date: new Date(2023, 5, 17, 18, 0) },
      { id: '3', name: 'Client Call', date: new Date(2023, 5, 16, 14, 30) },
    ]
    setEvents(sampleEvents)
  }, [])

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="bg-gray-100 p-2 rounded">
            <div className="font-medium">{event.name}</div>
            <div className="text-sm text-gray-600">{format(event.date, 'MMM d, yyyy h:mm a')}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}