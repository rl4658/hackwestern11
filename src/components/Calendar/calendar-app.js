"use client";

import { useState } from "react";
import Header from "./header";
import MainCalendar from "./main-calendar";
import SideCalendar from "./side-calendar";
import TaskList from "./tasks-lists";
import VoicePrompt from "./voice-prompt";
import AddTaskModal from "./add-tasks-modal";
import UpcomingEvents from "./upcoming-events";
import NoteSection from "./note-section";
import "../../css/calendar.css";

export default function CalendarApp() {
  const [tasks, setTasks] = useState([]); // Centralized state for tasks
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="calendar-app">
      {/* Header */}
      <Header className="calendar-header" />

      <div className="calendar-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <SideCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <div className="upcoming-events-wrapper">
            <UpcomingEvents tasks={tasks} />
          </div>
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

          {/* Note Section */}
          <NoteSection />

          <TaskList />
          <VoicePrompt />
        </aside>
      </div>

      {/* Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}
