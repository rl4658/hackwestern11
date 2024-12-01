"use client";

import { useState } from "react";
import Header from "./header";
import MainCalendar from "./main-calendar";
import SideCalendar from "./side-calendar";
import TaskList from "./tasks-lists";
import VoicePrompt from "./voice-prompt";
import AddTaskModel from "./add-tasks-modal";
import UpcomingEvents from "./upcoming-events";
// import Footer from "./calendar-footer";
import "../css/calendar.css";

export default function CalendarApp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

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
            <UpcomingEvents />
          </div>
        </aside>

        {/* Main Calendar */}
        <main className="main-calendar">
          <MainCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="add-task-button"
          >
            Add Task
          </button>
          <TaskList />
          <VoicePrompt />
        </aside>
      </div>

      {/* Footer */}
      {/* <Footer className="calendar-footer" /> */}

      {/* Task Modal */}
      <AddTaskModel
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
}
