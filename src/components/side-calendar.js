"use client";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "../css/calendar.css";

export default function SideCalendar({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const prevMonth = () =>
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  const nextMonth = () =>
    setCurrentMonth(
      (next) => new Date(next.getFullYear(), next.getMonth() + 1, 1),
    );

  return (
    <div className="side-calendar">
      {/* Calendar Header */}
      <div className="side-calendar-header">
        <button
          onClick={prevMonth}
          className="calendar-nav-button"
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <h2 className="calendar-month-title">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="calendar-nav-button"
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>

      {/* Week Days */}
      <div className="weekday-labels">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="days-grid">
        {days.map((day) => (
          <button
            key={day.toISOString()}
            className={`day-button ${isSameDay(day, selectedDate)
              ? "selected"
              : isSameMonth(day, currentMonth)
                ? "current-month"
                : "outside-month"
              }`}
            onClick={() => onDateSelect(day)}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}