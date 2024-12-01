"use client";

import { useState } from "react";
import Header from "./header";
import MainCalendar from "./main-calendar";
import SideCalendar from "./side-calendar";
import AddTaskModal from "./add-tasks-modal";
import UpcomingEvents from "./upcoming-events";
import "../../css/calendar.css";

export default function CalendarApp() {
  const [tasks, setTasks] = useState([]); // Centralized state for tasks
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task
  };

  const importTasks = (importedTasks) => {
    setTasks((prevTasks) => [...prevTasks, ...importedTasks]); // Merge imported tasks
  };

  return (
    <div className="calendar-app">
      {/* Header */}
      <Header onImportTasks={importTasks} />

      <div className="calendar-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <SideCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <UpcomingEvents tasks={tasks} />
        </aside>

        {/* Main Calendar */}
        <main className="main-calendar">
          <MainCalendar tasks={tasks} selectedDate={selectedDate} />
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="add-task-button"
          >
            Add Task
          </button>
        </aside>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}
