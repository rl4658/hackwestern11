import { useState, useEffect } from 'react'
import { format, addDays, startOfWeek, differenceInMinutes, setHours, setMinutes } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const MINUTES_IN_DAY = 24 * 60
const ROW_HEIGHT = 30 // 30 minutes per row

export function MainCalendar({ selectedDate, onDateSelect }) {
  const [tasks, setTasks] = useState([])

  const weekStart = startOfWeek(selectedDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const timeSlots = Array.from({ length: 48 }, (_, i) => i * 30) // 48 30-minute slots in a day

  useEffect(() => {
    // Sample tasks for demonstration
    const sampleTasks = [
      {
        id: '1',
        name: 'Morning Meeting',
        start: setMinutes(setHours(new Date(selectedDate), 9), 0),
        end: setMinutes(setHours(new Date(selectedDate), 10), 30),
        isStatic: true,
      },
      {
        id: '2',
        name: 'Lunch Break',
        start: setMinutes(setHours(new Date(selectedDate), 12), 0),
        end: setMinutes(setHours(new Date(selectedDate), 13), 0),
        isStatic: false,
      },
      {
        id: '3',
        name: 'Project Work',
        start: setMinutes(setHours(new Date(selectedDate), 14), 0),
        end: setMinutes(setHours(new Date(selectedDate), 17), 30),
        isStatic: false,
      },
    ]
    setTasks(sampleTasks)
  }, [selectedDate])

  const onDragEnd = (result) => {
    if (!result.destination) return

    const updatedTasks = Array.from(tasks)
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1)
    updatedTasks.splice(result.destination.index, 0, reorderedTask)

    setTasks(updatedTasks)
  }

  const getTaskPosition = (task) => {
    const startOfDay = setMinutes(setHours(new Date(task.start), 0), 0)
    const taskStart = differenceInMinutes(task.start, startOfDay)
    const taskDuration = differenceInMinutes(task.end, task.start)
    const top = (taskStart / MINUTES_IN_DAY) * 100
    const height = (taskDuration / MINUTES_IN_DAY) * 100

    return { top: `${top}%`, height: `${height}%` }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-px bg-gray-200 min-w-[800px]">
          {/* Time labels */}
          <div className="bg-white">
            {timeSlots.map((minutes) => (
              <div key={minutes} className="h-[30px] px-2 text-xs flex items-center justify-end">
                {format(setMinutes(setHours(new Date(), 0), minutes), 'HH:mm')}
              </div>
            ))}
          </div>

          {/* Days and tasks */}
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="relative bg-white">
              <div className="sticky top-0 z-10 bg-white border-b p-2 text-center">
                {format(day, 'EEE dd/MM')}
              </div>
              <Droppable droppableId={format(day, 'yyyy-MM-dd')}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="h-[1440px] relative"
                  >
                    {tasks
                      .filter((task) => format(task.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`absolute left-0 right-0 p-1 m-[1px] rounded text-xs overflow-hidden ${
                                task.isStatic ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                              }`}
                              style={{
                                ...getTaskPosition(task),
                                ...provided.draggableProps.style,
                              }}
                            >
                              <div className="font-semibold">{task.name}</div>
                              <div>
                                {format(task.start, 'HH:mm')} - {format(task.end, 'HH:mm')}
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
  )
}