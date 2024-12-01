"use client";

import {
  differenceInMinutes,
  format,
  addDays,
  startOfWeek,
  setHours,
  setMinutes,
} from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../css/calendar.css";

const MINUTES_IN_DAY = 24 * 60;

function MainCalendar({ tasks, selectedDate }) {
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const timeSlots = Array.from({ length: 48 }, (_, i) => i * 30); // 48 half-hour slots

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // Handle drag-and-drop logic here (if required)
  };

  const getTaskPosition = (task) => {
    const startOfDay = setMinutes(setHours(new Date(task.date), 0), 0);
    const taskStart = differenceInMinutes(
      setMinutes(
        setHours(new Date(task.date), task.startTime.split(":")[0]),
        task.startTime.split(":")[1]
      ),
      startOfDay
    );
    const taskDuration = differenceInMinutes(
      setMinutes(
        setHours(new Date(task.date), task.endTime.split(":")[0]),
        task.endTime.split(":")[1]
      ),
      setMinutes(
        setHours(new Date(task.date), task.startTime.split(":")[0]),
        task.startTime.split(":")[1]
      )
    );
    const top = (taskStart / MINUTES_IN_DAY) * 100;
    const height = (taskDuration / MINUTES_IN_DAY) * 100;

    return { top: `${top}%`, height: `${height}%` };
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="calendar-container">
        <div className="calendar-grid">
          {/* Time Labels */}
          <div className="time-label">
            {timeSlots.map((minutes) => (
              <div key={minutes} className="time-label-item">
                {format(setMinutes(setHours(new Date(), 0), minutes), "HH:mm")}
              </div>
            ))}
          </div>

          {/* Week Columns */}
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="day-column">
              <div className="day-header">{format(day, "EEE dd/MM")}</div>
              <Droppable droppableId={format(day, "yyyy-MM-dd")}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable-area"
                  >
                    {/* Render Tasks */}
                    {tasks
                      .filter(
                        (task) =>
                          format(new Date(task.date), "yyyy-MM-dd") ===
                          format(day, "yyyy-MM-dd")
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
                                ...getTaskPosition(task),
                                ...provided.draggableProps.style,
                              }}
                            >
                              <div
                                className="task-title"
                                style={{ backgroundColor: task.color }}
                              >
                                {task.name} {/* Only displaying task name */}
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
