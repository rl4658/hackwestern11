'use client'
import React, { useState } from 'react'

export function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete project proposal' },
    { id: 2, name: 'Review team presentations' },
    { id: 3, name: 'Schedule client meeting' },
  ])

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className="bg-gray-100 p-2 mb-2 rounded">
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  )
}