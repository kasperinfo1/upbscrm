import React, { useEffect, useState } from "react";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { MdKeyboardArrowRight, MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { LuUserMinus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceData } from "../../redux/slices/attendanceSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const EmployeeStatus = () => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  const { attendanceData, status } = useSelector((state) => state.attendance);
  const [showAllAbsent, setShowAllAbsent] = useState(false);
  const [showAllHalfDay, setShowAllHalfDay] = useState(false);
  const [showAllBreak, setShowAllBreak] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceData());
    }
  }, [status, dispatch]);

  const handleToggleShowAllAbsent = () => {
    setShowAllAbsent((prevState) => !prevState);
  };

  const handleToggleShowAllHalfDay = () => {
    setShowAllHalfDay((prevState) => !prevState);
  };

  const handleToggleShowAllBreak = () => {
    setShowAllBreak((prevState) => !prevState);
  };

  const getAttendanceMark = (user) => {
    if (!user || !user.attendance) {
      return "Absent";
    }

    const loginTime = user.attendance.loginTime && user.attendance.loginTime[0];

    if (typeof loginTime !== "string") {
      return "Absent";
    }

    const [loginHour, loginMinute] = loginTime.split(":").map(Number);

    if (isNaN(loginHour) || isNaN(loginMinute)) {
      return "Absent";
    }

    if (loginHour > 9 || (loginHour === 9 && loginMinute > 45)) {
      return "Half Day";
    } else if (loginHour === 9 && loginMinute > 30) {
      return "Late";
    }

    return "Present";
  };

  // Separate Absent, Half Day, and Break data
  const absentData = attendanceData.filter(
    (attn) =>
      !attn?.attendance?.loginTime[0] ||
      attn?.attendance?.loginTime[0] === "WO" ||
      attn?.attendance === null
  );

  const halfDayData = attendanceData.filter((attn) => {
    const loginTime = attn?.attendance?.loginTime[0];
    if (!loginTime || loginTime === "WO" || attn?.attendance === null) {
      return false; // Exclude Absent data
    }

    const [hours, minutes] = loginTime.split(":").map(Number);
    return hours > 9 || (hours === 9 && minutes > 45);
  });

  const breakData = attendanceData.filter(attn => attn?.attendance?.status === "Break");

  // Present data if none of the other categories are populated
  const presentData = attendanceData.filter(attn => 
    !absentData.includes(attn) && 
    !halfDayData.includes(attn) && 
    !breakData.includes(attn)
  );

  const displayedAbsentData = showAllAbsent ? absentData : absentData.slice(0, 2);
  const displayedHalfDayData = showAllHalfDay ? halfDayData : halfDayData.slice(0, 2);
  const displayedBreakData = showAllBreak ? breakData : breakData.slice(0, 2);

  const userType = localStorage.getItem("Account");
  const paths = {
    1: "/admin/todaysAttendance",
    2: "/hr/todaysAttendance",
  };


  return (
    <div
      style={{
        height: "34rem",
        overflow: "hidden",
        color: darkMode ? "black" : "white",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="p-2 px-3 shadow-sm rounded-2 d-flex flex-column gap-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="my-0 fw-normal d-flex align-items-center gap-2">
          <AiOutlineUser /> Employee Status
        </h5>
        {/* <span className="py-1 px-2  rounded-5">
          See All <MdOutlineArrowForwardIos />
        </span> */}
        <Link
        to={paths[userType]}
        style={{ cursor: "pointer",minHeight: "1.6rem",minWidth: "1.6rem", background: darkMode ? "#ededf1d4" : "#252424c3",}}
        className="btn btn-light d-flex align-items-center bg-white rounded-5 px-3"
      >
        View All <MdKeyboardArrowRight/>
      </Link>
      </div>
      <div style={{ height: "30rem", overflow: "auto" }}>
        <hr className="m-0 my-2" style={{ border: '1px solid rgba(0,0,0,.3)' }} />
        
        {/* Conditionally show Absent, Half Day, Break or Present */}
        {displayedAbsentData.length > 0 && displayedHalfDayData.length > 0 && displayedBreakData.length > 0 ? (
          // Present Section
          <div className=" p-2 px-3 mb-1 rounded-3 shadow-sm">
            <h6 className="text-start">Present</h6>
            {presentData.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {presentData.map((attn, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={
                            attn?.profile?.image_url
                              ? attn?.profile?.image_url
                              : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid"
                          }
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column text-start text-capitalize">
                        <p className="m-0">
                          {attn?.FirstName} {attn?.LastName}
                        </p>
                        <p className="m-0">{attn?.department?.DepartmentName}</p>
                      </div>
                    </div>
                    <span className={`badge-success ms-auto py-1`}>
                      Present
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-start">No employees are currently present.</p>
            )}
          </div>
        ) : (
          <>
        {/* Absent Section */}
        <div className=" p-2 px-3 mb-1 rounded-3 shadow-sm">
          <h6 className="text-start">Absent</h6>
          {displayedAbsentData.length > 0 ? (<div className="d-flex flex-column gap-2">
            {displayedAbsentData.map((attn, index) => (
              <div key={index} className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={
                        attn?.profile?.image_url
                          ? attn?.profile?.image_url
                          : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid"
                      }
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column text-start text-capitalize">
                    <p className="m-0">
                      {attn?.FirstName} {attn?.LastName}
                    </p>
                    <p className="m-0">{attn?.department?.DepartmentName}</p>
                  </div>
                </div>
                <span
                  className={`${
                    darkMode
                      ? "badge-danger ms-auto py-1"
                      : "badge-danger-dark ms-auto py-1"
                  }`}
                >
                  <LuUserMinus className="my-auto" />{" "}
                  {attn?.attendance?.loginTime[0]
                    ? getAttendanceMark(attn)
                    : "Absent"}
                </span>
              </div>
            ))}
          </div>) : (<p className="text-start">Great! No one is absent today.</p>)}
          
          {absentData.length > 2 && (
            <div className="d-flex">
              <button
                className="btn py-0 px-2 rounded-0 shadow-sm border my-2 mx-0"
                onClick={handleToggleShowAllAbsent}
              >
                {showAllAbsent ? (<span className="d-flex align-items-center gap-1" style={{color: darkMode ? "black" : "white"}}>Show Less <IoIosArrowUp /></span>) : (<span className="d-flex align-items-center gap-1" style={{color: darkMode ? "black" : "white"}}>Show more (+{absentData.length - 2}) <IoIosArrowDown /></span>)} 
              </button>
            </div>
          )}
        </div>

        {/* Half Day Section */}
        <div className=" p-2 px-3 mb-1 rounded-3 shadow-sm">
          <h6 className="text-start mt-3">Half Day</h6>
          {displayedHalfDayData.length > 0 ? (<div className="d-flex flex-column gap-2">
            {displayedHalfDayData.map((attn, index) => (
              <div key={index} className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={
                        attn?.profile?.image_url
                          ? attn?.profile?.image_url
                          : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid"
                      }
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column text-start text-capitalize">
                    <p className="m-0">
                      {attn?.FirstName} {attn?.LastName}
                    </p>
                    <p className="m-0">{attn?.department?.DepartmentName}</p>
                  </div>
                </div>
                <span
                  className={`${
                    darkMode
                      ? "badge-warning ms-auto py-1"
                      : "badge-warning-dark ms-auto py-1"
                  }`}
                >
                  <GoClock /> {getAttendanceMark(attn)}
                </span>
              </div>
            ))}
          </div>) : (
  <p className="text-start">Great! No one is half-day today.</p>
)}
          
          {halfDayData.length > 2 && (
            <div className="d-flex">
              <button
                className="btn py-0 px-2 rounded-0 shadow-sm border my-2 mx-0"
                onClick={handleToggleShowAllHalfDay}
              >
                {showAllHalfDay ? (<span className="d-flex align-items-center gap-1" style={{color: darkMode ? "black" : "white"}}>Show Less <IoIosArrowUp /></span>) : (<span className="d-flex align-items-center gap-1" style={{color: darkMode ? "black" : "white"}}>Show more (+{halfDayData.length - 2}) <IoIosArrowDown /></span>)} 
              
              </button>
            </div>
          )}
        </div>

        {/* Break Section */}
        <div className=" p-2 px-3 mb-1 rounded-3 shadow-sm">
          <h6 className="text-start mt-3">Break</h6>
          {displayedBreakData.length > 0 ? (
  <div className="d-flex flex-column gap-2">
    {displayedBreakData.map((attn, index) => (
      <div key={index} className="d-flex align-items-center">
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              overflow: "hidden", // Ensure image fits within the circle
            }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={
                attn?.profile?.image_url
                  ? attn?.profile?.image_url
                  : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid"
              }
              alt="Profile"
            />
          </div>
          <div className="d-flex flex-column text-start text-capitalize">
            <p className="m-0">
              {attn?.FirstName} {attn?.LastName}
            </p>
            <p className="m-0">{attn?.department?.DepartmentName}</p>
          </div>
        </div>
        <span
          className={`${
            darkMode
              ? "badge-warning ms-auto py-1"
              : "badge-warning-dark ms-auto py-1"
          }`}
        >
          <GoClock /> {attn?.attendance?.status || "Absent"}
        </span>
      </div>
    ))}
  </div>
) : (
  <p className="text-start">Great! No one is on break at the moment</p>
)}

          {breakData.length > 2 && (
            <div className="d-flex">
              <button
                className="btn py-0 px-2 rounded-0 shadow-sm border my-2 mx-0"
                onClick={handleToggleShowAllBreak}
              >
                {showAllBreak ? (<span className="d-flex align-items-center gap-1" style={{color: darkMode ? "black" : "white"}}>Show Less <IoIosArrowUp /></span>) : (<span className="d-flex align-items-center gap-1" style={{color: darkMode ? "black" : "white"}}>Show more (+{breakData.length - 2}) <IoIosArrowDown /></span>)} 
              </button>
            </div>
          )}
        </div>
          </>
        )}
        <hr className="m-0 my-2" style={{ border: '1px solid rgba(0,0,0,.3)' }} />
      </div>
    </div>
  );
};

export default EmployeeStatus;
