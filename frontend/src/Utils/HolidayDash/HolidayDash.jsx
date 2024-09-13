import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiPartyFlags } from "react-icons/gi";
import { fetchHolidays } from "../../redux/slices/holidaysSlice";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import holidayImage from "../../img/holidayImage.svg";
import KasperCalendar from "../KasperCalendar/KasperCalendar";
import { MdDateRange, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const HolidayDash = () => {
  const dispatch = useDispatch();
  const holidaysData = useSelector((state) => state.holidays.holidaysData);
  const status = useSelector((state) => state.holidays.status);
  const { darkMode } = useTheme();

  // State for month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHolidays());
    }
  }, [status, dispatch]);

  const monthNames = [
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

  const monthName = monthNames[currentMonth];

  // Filter holidays for the current month and year
  const holidaysForCurrentMonth = holidaysData.filter(
    (holiday) =>
      holiday.holidayYear === currentYear &&
      holiday.holidayMonth === currentMonth + 1
  );

  // Handle month and year changes
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        color: darkMode ? "black" : "white",
        background: darkMode ? "#F5F5F6" : "#161515f6", 
      }}
      className="px-3 shadow-sm rounded-2 d-flex flex-column gap-2 justify-content-between pb-3 pt-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <button className="shadow-sm btn btn-light d-flex align-items-center justify-content-center" onClick={handlePreviousMonth}><MdOutlineKeyboardArrowLeft /></button>
        <span className="shadow-sm btn btn-light d-flex align-items-center justify-content-center">
        Calendar |  {monthName}, {currentYear}
        </span>
        <button className="shadow-sm btn btn-light d-flex align-items-center justify-content-center" onClick={handleNextMonth}><MdOutlineKeyboardArrowRight /></button>
      </div>
      <div
        style={{
          height: "100%",
          overflow: "auto",
          background: darkMode ? "#ededf1d4" : "#252424c3",
        }}
        className="rounded-3 p-2 py-2"
      >
        <KasperCalendar
          holidays={holidaysForCurrentMonth}
          year={currentYear}
          month={currentMonth}
        />
      </div>
    </div>
  );
};

export default HolidayDash;
