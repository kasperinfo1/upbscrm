import React, { useState, useRef } from "react";
import "./KasperCalendar.css"; 
import { useTheme } from "../../Context/TheamContext/ThemeContext";

const KasperCalendar = ({ holidays, year, month }) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [hoveredHoliday, setHoveredHoliday] = useState(null); 
  const [popoverPosition, setPopoverPosition] = useState({}); 
  const calendarRef = useRef(null); 
  const {darkMode} = useTheme()

  const handleMouseEnter = (event, holiday) => {
    setHoveredHoliday(holiday);

    const calendarBounds = calendarRef.current.getBoundingClientRect();
    const dayBounds = event.target.getBoundingClientRect(); 
    let position = {};
    const spaceLeft = dayBounds.left - calendarBounds.left;
    const spaceRight = calendarBounds.right - dayBounds.right;
    const spaceTop = dayBounds.top - calendarBounds.top;
    const spaceBottom = calendarBounds.bottom - dayBounds.bottom;

    if (spaceRight > 150) {
      position = { left: "110%", top: "50%", transform: "translateY(-50%)" };
    } else if (spaceLeft > 150) {
      position = { right: "110%", top: "50%", transform: "translateY(-50%)" };
    } else if (spaceBottom > 100) {
      position = { top: "120%", left: "50%", transform: "translateX(-50%)" };
    } else if (spaceTop > 100) {
      position = { bottom: "120%", left: "50%", transform: "translateX(-50%)" };
    } else {
      position = { left: "110%", top: "50%", transform: "translateY(-50%)" };
    }

    setPopoverPosition(position);
  };

  const generateDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isHoliday = holidays.find(
        (holiday) =>
          holiday.holidayYear === year &&
          holiday.holidayMonth === month + 1 &&
          holiday.holidayDate === day
      );

      const isCurrentDay =
        day === currentDay && month === currentMonth && year === currentYear;

      days.push(
        <div
          onMouseEnter={(event) => handleMouseEnter(event, isHoliday)}
          onMouseLeave={() => setHoveredHoliday(null)}
          key={day}
          className={`calendar-day ${isCurrentDay ? "current" : ""}`}
          style={{ position: "relative" }}
        >
          <span className="d-flex align-items-center" style={{ position: "relative" }}>
            {day}
            {isHoliday && (
              <div
                style={{
                  height: ".5rem",
                  width: ".54rem",
                  background: "red",
                  borderRadius: "50%",
                  position: "absolute",
                  right: "-.8rem",
                  // border:'1px solid white'
                }}
              ></div>
            )}
          </span>
          {hoveredHoliday === isHoliday && isHoliday && (
            <div
              style={{
                background: "white",
                zIndex: "2",
                position: "absolute",
                ...popoverPosition,
                padding: "0.5rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                borderRadius: "4px",
                width: "150px",
              }}
            >
              <div className="d-flex align-items-center gap-1">
                <div
                  style={{
                    height: ".5rem",
                    width: ".5rem",
                    background: "red",
                    borderRadius: "0",
                    marginBottom: "0.2rem",
                  }}
                ></div>
                <p style={{color:"black" }} className="m-0 text-start">{isHoliday.holidayName}</p>
              </div>
              <span className="badge badge-primary fw-normal">{isHoliday.holidayType}</span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div style={{color: "black"}} className="calendar-header">
        {dayNames.map((day, index) => (
          <div key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-container" ref={calendarRef}>
        {generateDays()}
      </div>
    </div>
  );
};

export default KasperCalendar;
