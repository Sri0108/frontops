import React, { useState, useRef, useEffect } from "react";

const CalendarComponent = ({ date, set_newdate }) => {
  const [day, month, year] = date.toString().split("-");
  const today = new Date(year, month - 1, day);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility

  const calendarRef = useRef(null); // Reference to the calendar container

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Restrict years to 2022-2026
  const years = [2022, 2023, 2024, 2025, 2026];

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    let new_month = (currentMonth + 1).toString();
    let new_day = day.toString();
    if (new_month.length === 1) {
      new_month = `0${new_month}`;
    }
    if (new_day.length === 1) {
      new_day = `0${new_day}`;
    }
    set_newdate(`${new_day}-${new_month}-${currentYear}`);
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);

    // Empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div className="calendar-cell empty" key={`empty-${i}`}></div>);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isAllowedDate =
        day === 13 && currentMonth === 8 && currentYear === 2024; // 8 is September (0-based index)

      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === currentMonth &&
        selectedDate?.getFullYear() === currentYear;

      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-cell ${isSelected ? "selected" : ""} ${
            isToday ? "today" : ""
          } ${isAllowedDate ? "" : "disabled"}`}
          onClick={isAllowedDate ? () => handleDateClick(day) : null} // Disable click for non-allowed dates
          style={{
            pointerEvents: isAllowedDate ? "auto" : "none", // Prevent clicking disabled dates
            opacity: isAllowedDate ? 1 : 0.5, // Dim disabled dates visually
          }}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false); // Close the calendar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="calendar-container">
      <button
        className="calendar-toggle-button"
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
      >
        {selectedDate ? `${selectedDate.toDateString()}` : "Select a Date"}
      </button>

      {showCalendar && (
        <div ref={calendarRef} className="calendar-popup">
          <div className="calendar-header">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="calendar-grid">
            <div className="calendar-cell header">Sun</div>
            <div className="calendar-cell header">Mon</div>
            <div className="calendar-cell header">Tue</div>
            <div className="calendar-cell header">Wed</div>
            <div className="calendar-cell header">Thu</div>
            <div className="calendar-cell header">Fri</div>
            <div className="calendar-cell header">Sat</div>
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
