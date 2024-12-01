"use client";

import { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  differenceInMinutes,
  setHours,
  setMinutes,
} from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../css/calendar.css";

const MINUTES_IN_DAY = 24 * 60;

function MainCalendar({ selectedDate, onDateSelect }) {
  const [tasks, setTasks] = useState([]);
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const timeSlots = Array.from({ length: 48 }, (_, i) => i * 30); // 48 half-hour slots

  useEffect(() => {
    const sampleTasks = [
      {
        id: "1",
        name: "Morning Meeting",
        start: setMinutes(setHours(new Date(selectedDate), 9), 0),
        end: setMinutes(setHours(new Date(selectedDate), 10), 30),
        isStatic: true,
      },
      {
        id: "2",
        name: "Lunch Break",
        start: setMinutes(setHours(new Date(selectedDate), 12), 0),
        end: setMinutes(setHours(new Date(selectedDate), 13), 0),
        isStatic: false,
      },
      {
        id: "3",
        name: "Project Work",
        start: setMinutes(setHours(new Date(selectedDate), 14), 0),
        end: setMinutes(setHours(new Date(selectedDate), 17), 30),
        isStatic: false,
      },
    ];
    setTasks(sampleTasks);
  }, [selectedDate]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(updatedTasks);
  };

  const getTaskPosition = (task, index) => {
    const startOfDay = setMinutes(setHours(new Date(task.start), 0), 0);
    const taskStart = differenceInMinutes(task.start, startOfDay);
    const taskDuration = differenceInMinutes(task.end, task.start);
    const top = (taskStart / MINUTES_IN_DAY) * 100;
    const height = (taskDuration / MINUTES_IN_DAY) * 100;

    const left = `${index * 10}%`;
    const width = `calc(100% - ${index * 10}%)`;

    return { top: `${top}%`, height: `${height}%`, left, width };
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="calendar-container">
        <div className="calendar-grid">
          <div className="time-label">
            {timeSlots.map((minutes) => (
              <div key={minutes} className="time-label-item">
                {format(setMinutes(setHours(new Date(), 0), minutes), "HH:mm")}
              </div>
            ))}
          </div>
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="day-column">
              <div className="day-header">
                {format(day, "EEE dd/MM")}
              </div>
              <Droppable droppableId={format(day, "yyyy-MM-dd")}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable-area"
                  >
                    {tasks
                      .filter(
                        (task) =>
                          format(task.start, "yyyy-MM-dd") ===
                          format(day, "yyyy-MM-dd"),
                      )
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-item ${task.isStatic ? "static" : "dynamic"
                                }`}
                              style={{
                                ...getTaskPosition(task, index),
                                ...provided.draggableProps.style,
                              }}
                            >
                              <div className="task-title">{task.name}</div>
                              <div className="task-time">
                                {format(task.start, "HH:mm")} -{" "}
                                {format(task.end, "HH:mm")}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default MainCalendar;
