"use client";

import { useState, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import "../../css/calendar.css";

export default function SideCalendar({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));
  const [isYearPickerOpen, setYearPickerOpen] = useState(false);
  const [isMonthPickerOpen, setMonthPickerOpen] = useState(false);
  const [pickerStyle, setPickerStyle] = useState({});

  const monthRef = useRef();
  const yearRef = useRef();

  // Generate only the days for the current month
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const prevMonth = () =>
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );

  const nextMonth = () =>
    setCurrentMonth(
      (next) => new Date(next.getFullYear(), next.getMonth() + 1, 1)
    );

  const selectYear = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setYearPickerOpen(false);
  };

  const selectMonth = (month) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
    setMonthPickerOpen(false);
  };

  const years = Array.from(
    { length: 21 },
    (_, i) => currentMonth.getFullYear() - 10 + i
  );

  // Dynamically position picker
  const calculatePickerPosition = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    setPickerStyle({
      top: `${rect.top - 200}px`, // Adjusted for better alignment
      left: `${rect.left + rect.width / 2}px`,
      transform: "translateX(-50%)",
    });
  };

  const toggleMonthPicker = () => {
    calculatePickerPosition(monthRef);
    setMonthPickerOpen((prev) => !prev);
    setYearPickerOpen(false);
  };

  const toggleYearPicker = () => {
    calculatePickerPosition(yearRef);
    setYearPickerOpen((prev) => !prev);
    setMonthPickerOpen(false);
  };

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
          <span
            ref={monthRef}
            onClick={toggleMonthPicker}
            className="month-trigger"
          >
            {format(currentMonth, "MMMM")}
          </span>{" "}
          <span
            ref={yearRef}
            onClick={toggleYearPicker}
            className="year-trigger"
          >
            {format(currentMonth, "yyyy")}
          </span>
        </h2>
        <button
          onClick={nextMonth}
          className="calendar-nav-button"
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>

      {/* Month Picker */}
      {isMonthPickerOpen && (
        <div
          className="picker-container"
          style={{ ...pickerStyle, zIndex: 1000 }}
        >
          <span className="picker-arrow">↑</span>
          <div className="picker-scrollable">
            {Array.from({ length: 12 }, (_, i) => (
              <button
                key={i}
                onClick={() => selectMonth(i)}
                className={`picker-button ${currentMonth.getMonth() === i ? "active" : ""
                  }`}
              >
                {format(new Date(currentMonth.getFullYear(), i, 1), "MMMM")}
              </button>
            ))}
          </div>
          <span className="picker-arrow">↓</span>
        </div>
      )}

      {/* Year Picker */}
      {isYearPickerOpen && (
        <div
          className="picker-container"
          style={{ ...pickerStyle, zIndex: 1000 }}
        >
          <span className="picker-arrow">↑</span>
          <div className="picker-scrollable">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className={`picker-button ${currentMonth.getFullYear() === year ? "active" : ""
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
          <span className="picker-arrow">↓</span>
        </div>
      )}

      {/* Weekday Labels */}
      <div className="weekday-labels">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="days-grid">
        {days.map((day) => (
          <button
            key={day.toISOString()}
            className={`day-button ${isSameDay(day, selectedDate) ? "selected" : ""
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
