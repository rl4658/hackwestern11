import { useState } from 'react';
import { Header } from './header';
import { MainCalendar } from './main-calendar';
import { SideCalendar } from './side-calendar';
import { TaskList } from './tasks-lists';
import { VoicePrompt } from './voice-prompt';
import { AddTaskModal } from './add-tasks-modal';
import { GeneratedSchedules } from './generated-schedules';
import { Footer } from './calendar-footer';
import { Button } from  "@mui/material";
import { UpcomingEvents } from './upcoming-events';

export default function CalendarApp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 p-4 border-r overflow-auto">
          <SideCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          <UpcomingEvents />
        </div>
        <div className="flex-1 overflow-auto">
          <MainCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>
        <div className="w-64 p-4 border-l overflow-auto">
          <Button onClick={() => setIsAddTaskModalOpen(true)} className="w-full mb-4">Add Task</Button>
          <TaskList />
          <VoicePrompt />
        </div>
      </div>
      <GeneratedSchedules />
      <Footer />
      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} />
    </div>
  );
}
