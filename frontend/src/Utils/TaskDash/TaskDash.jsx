import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Pages/config/config";
import "./TaskDash.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { HiArrowLongRight, HiOutlineCalendarDays } from "react-icons/hi2";
import { MdOutlineAddTask } from "react-icons/md";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import TaskImage from "../../img/Task/ActiveTask.svg";

const TaskDash = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  const email = localStorage.getItem("Email");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError("Error fetching tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const ShortedText = (text) => {
    if (text.length > 130) {
      return text.toString().slice(0, 130) + "...";
    } else {
      return text;
    }
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatUpdateDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleWheel = (e) => {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      container.scrollLeft += e.deltaY; // Scroll horizontally on vertical scroll
      e.preventDefault(); // Prevent default vertical scroll
    }
  };

  // Function to calculate the overall progress of the task
  const calculateProgress = (task) => {
    const totalEmployees =
      task.employees.length -
      task.employees.filter((emp) => emp.emptaskStatus === "Rejected").length;
    const completedTasks = task.employees.filter(
      (emp) => emp.emptaskStatus === "Completed"
    ).length;
    return totalEmployees > 0 ? (completedTasks / totalEmployees) * 100 : 0;
  };

  const TaskStatus = (key) => {
    switch (key) {
      case "Assigned":
        return (
          <span
            className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
            style={{
              background: darkMode ? "#e1ea2f4b" : "#131414f1",
              color: darkMode ? "#131414f1" : "#f3ff14c4",
              fontSize: ".8rem",
            }}
          >
            Assigned
          </span>
        );

      case "Completed":
        return (
          <span
            className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
            style={{
              background: darkMode ? "#3ee7284a" : "#131414f1",
              color: darkMode ? "#131414f1" : "#1cdf4dc4",
              fontSize: ".8rem",
            }}
          >
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span
            className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
            style={{
              background: darkMode ? "#e1ea2f4b" : "#131414f1",
              color: darkMode ? "#131414f1" : "#f3ff14c4",
              fontSize: ".8rem",
            }}
          >
            Cancelled
          </span>
        );
      case "Rejected":
        return (
          <span
            className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
            style={{
              background: darkMode ? "#e1ea2f4b" : "#131414f1",
              color: darkMode ? "#131414f1" : "#f3ff14c4",
              fontSize: ".8rem",
            }}
          >
            Rejected
          </span>
        );

      default:
        return (
          <span
            className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
            style={{
              background: darkMode ? "#e1ea2f4b" : "#131414f1",
              color: darkMode ? "#131414f1" : "#f3ff14c4",
              fontSize: ".8rem",
            }}
          >
            Pending
          </span>
        );
    }
  };

  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="p-2 px-3 shadow-sm rounded-2 d-flex flex-column gap-2"
      onWheel={handleWheel}
    >
      <div
        style={{ height: "3vh" }}
        className="d-flex align-items-center justify-content-between"
      >
        <h5 style={{color : darkMode ? "black" : "white"}} className="my-1 fw-normal  d-flex align-items-center gap-2">
          <MdOutlineAddTask /> Team Task
        </h5>
        <Link
          to="/employee/task"
          className="d-flex text-decoration-none text-black align-items-center justify-content-center bg-white px-2 rounded-5"
        >
          See All
        </Link>
      </div>
      <div>
        {" "}
        {tasks.filter((task) =>
          task.employees.some((taskemp) => taskemp.empemail === email)
        ).length > 0 ? (
          <div
            className="d-flex w-100 align-items-center gap-3 py-2"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              height: "calc(100% - 3vh)",
            }}
          >
            {tasks
              .filter((task) =>
                task.employees.some((taskemp) => taskemp.empemail === email)
              )
              .reverse()
              .map((task, index) => (
                <div
                  style={{
                    height: "100%",
                    minHeight: "13rem",
                    width: "45%",
                    minWidth: "25rem",
                    overflow: "hidden",
                    background: darkMode ? "#ffffffbc" : "#252424c3",
                    border: darkMode
                      ? "1px solid #2524245a"
                      : "1px solid #f2f2f26c",
                  }}
                  className="shadow-sm rounded-3 d-flex flex-column justify-content-between p-2 "
                  key={index}
                >
                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 style={{color : darkMode ? "black" : "white"}} className="m-0">{task.Taskname}</h6>
                      {TaskStatus(task.status)}
                    </div>

                    <div
                      style={{ fontSize: ".8rem" }}
                      className="d-flex align-items-center gap-3"
                    >
                      <div className="my-1">
                        <span
                          style={{
                            width: "fit-content",
                            background: darkMode ? "#a2f6804a" : "#a6f4963c",
                            color: darkMode ? "#20680dc4" : "#3ddc11c4",
                          }}
                          className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
                        >
                          <HiOutlineCalendarDays /> {formatDOB(task.startDate)}
                        </span>
                      </div>
                      <HiArrowLongRight />
                      <div>
                        <span
                          style={{
                            width: "fit-content",
                            background: darkMode ? "#f6a18049" : "#f4a4963b",
                            color: darkMode ? "#681f0dc4" : "#ff6131ef",
                          }}
                          className="p-1 px-2 d-flex align-items-center gap-1  rounded-2"
                        >
                          <HiOutlineCalendarDays /> {formatDOB(task.endDate)}
                        </span>
                      </div>
                    </div>
                    <p 
                      style={{
                        whiteSpace: "wrap", color : darkMode ? "black" : "white"
                      }}
                    >
                      {ShortedText(task.description)}
                    </p>
                  </div>
                  <div>
                    <div className="d-flex align-items-center  gap-3 justify-content-between p-1">
                      <div
                        style={{
                          minHeight: ".3rem",
                          height: ".3rem",
                          maxHeight: ".3rem",
                          width: "100%",
                          background: "#78788054",
                        }}
                        className="rounded-5 "
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${calculateProgress(task)}%`,
                            background: "#007AFF",
                          }}
                          className="rounded-5"
                        ></div>
                      </div>
                      <span style={{ fontSize: ".8rem" }}>
                        {calculateProgress(task).toFixed(2)}%
                      </span>
                    </div>
                    <p  style={{ fontSize: ".8rem" , color : darkMode ? "black" : "white"}}>
                      Last Update : {formatUpdateDate(task.updatedAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div
            className="d-flex w-100 flex-column align-items-center justify-content-center gap-3 py-2"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              height: "14rem",
            }}
          >
            <img
              style={{ height: "120px", width: "120px" }}
              className="mx-auto"
              src={TaskImage}
              alt="Task Not Found"
            />
            <p
              style={{ opacity: "60%", fontSize: "13px" }}
              className="text-center w-75 mx-auto"
            >
              Task Not Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDash;
