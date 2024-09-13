import React, { useState, useEffect } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5"; // Import moon icon
import "./AttendanceCard.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../../Context/TheamContext/ThemeContext";

const AttendanceCard = () => {
  const { darkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Split the time string into time and AM/PM parts
  const [time, period] = currentTime.split(" ");

  // Determine whether it's evening (6 PM or later)
  const isEvening = new Date().getHours() >= 18;

  const userType = localStorage.getItem("Account");

  const paths = {
    1: "/admin/todaysAttendance",
    2: "/hr/attenDance",
    3: "/employee/MyAttendance",
    4: "/manager/myAttendance",
  };

  

  return (
    <div
      className="p-2 rounded-2 shadow-sm justify-content-between d-flex flex-column"
      style={{
        height: "17rem",
        border: darkMode ? "1px, solid #ede7e7da" : "1px solid #55585d76",
        background: !darkMode
          ? "linear-gradient(#152d5b, rgba(22, 21, 21, 0.816))"
          : "linear-gradient(#87aef6, rgb(255, 255, 255))",
        // backgroundImage:
        //   "url(https://media1.tenor.com/images/042292e831e2bb4d7207ee30908836b6/tenor.gif?itemid=15536525)",
        // "url(https://media.giphy.com/media/SirUFDS5F83Go/giphy.gif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="d-flex  align-items-center justify-content-between px-2">
        <div style={{color: !darkMode ? "white" : "black"}} className="d-flex flex-column gap-3 p-2">
          {isEvening ? (
            <IoMoonOutline style={{ fontSize: "5rem" }} />
          ) : (
            <IoSunnyOutline className="rotate" style={{ fontSize: "5rem" }} />
          )}
          <span>{currentDate}</span>
        </div>
        <div  className="d-flex align-items-center  gap-2">
          <div style={{color: !darkMode ? "white" : "black"}} className="d-flex flex-column">
            <span style={{ fontSize: "1.9rem" }}>{time}</span>
            <span style={{ fontSize: ".9rem" }}>Real time insight</span>
          </div>
          <div
            className="d-flex flex-column rounded-1"
            style={{ overflow: "hidden", fontSize: "1rem" }}
          >
            <span
              className="py-1 text-black px-3"
              style={{ background: "#f8f8f8eb" }}
            >
              {period}
            </span>
            <span
              style={{ background: "#dbd7d7" }}
              className="py-1 px-3 text-muted"
            >
              {period === "PM" ? "AM" : "PM"}
            </span>
          </div>
        </div>
      </div>

      <Link
        // to="/employee/MyAttendance"
        to={paths[userType]}
        style={{ cursor: "pointer" }}
        className="btn mx-2 bg-primary text-white"
      >
        View attendance
      </Link>
    </div>
  );
};

export default AttendanceCard;
