'use client'
import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@mui/material"

export function SideCalendar({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate))

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const prevMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth((next) => new Date(next.getFullYear(), next.getMonth() + 1, 1))

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <Button variant="ghost" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-gray-500 font-medium">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <Button
            key={day.toString()}
            variant="ghost"
            className={`p-2 ${
              !isSameMonth(day, currentMonth)
                ? 'text-gray-300'
                : isSameDay(day, selectedDate)
                ? 'bg-blue-500 text-white'
                : ''
            }`}
            onClick={() => onDateSelect(day)}
          >
            {format(day, 'd')}
          </Button>
        ))}
      </div>
    </div>
  )
}

