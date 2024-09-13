import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../Pages/config/config";
import RequestImage from "../../../img/Request/Request.svg";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";
import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
import profile from "../../../img/profile.jpg"
import AvatarGroup from "../../../Pages/AvatarGroup/AvatarGroup";

const EmployeeRejectTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("Email");
  const { darkMode } = useTheme();
  const [timeinfo, setTimeinfo] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`, {
        params: { status: "Completed" }, // Filter by status "Completed"
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error.message);
      setError("Error fetching completed tasks. Please try again later.");
    } finally {
      setLoading(false);
      // Schedule the next update after 1 minute (adjust as needed
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const rejectedTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.employee.Email === email && taskemp.empTaskStatus === "Rejected"
    )
  ).length;

  const toggleTaskDetails = (taskId) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };
  const accountAccess = (value)=>{
    switch(value){
      case 1: {return "Admin"}
      case 2:  {return "Hr"}
      case 3:  {return "Employee"}
      case 4:  {return "Manager"}
    }
  }

  return (
    <div className="p-4">
      <TittleHeader
        title={"Rejected Tasks"}
        numbers={rejectedTasksCount}
        message={"You can view all your Rejected task here."}
      />
      {loading && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="d-flex aline-center gap-2"
        >
          <div
            className="spinner-grow bg-primary"
            style={{ width: "1rem", height: "1rem" }}
            role="status"
          ></div>

          <span className="text-primary fw-bold">Loading...</span>
        </div>
      )}
      {tasks
          .filter((task) =>
            task.employees.some(
              (taskemp) =>
                taskemp.employee.Email === email &&
                taskemp.empTaskStatus === "Rejected"
            )
          ).length > 0  ? (<div className="row mx-auto">
            {tasks
              .filter((task) =>
                task.employees.some(
                  (taskemp) =>
                    taskemp.employee.Email === email &&
                    taskemp.empTaskStatus === "Rejected"
                )
              )
              .map((task, index) => (
                <div
                  key={task._id}
                  style={{
                    color: darkMode
                      ? "var(--primaryDashColorDark)"
                      : "var(--secondaryDashMenuColor)",
                  }}
                  className="col-12 col-md-6 col-lg-4 p-2"
                >
                  <div
                    style={{
                      border: !darkMode
                        ? "1px solid var(--primaryDashMenuColor)"
                        : "1px solid var(--secondaryDashColorDark)",
                    }}
                    className="task-hover-effect p-2"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>{task.Taskname}</h6>
                      <button
                        style={{ cursor: "auto" }}
                        className="btn btn-success"
                      >
                        {task.status}
                      </button>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <div className="d-flex align-items-center gap-2">
                       <img
                         style={{
                           height: "30px",
                           width: "30px",
                           borderRadius: "50%",
                           objectFit: "cover",
                         }}
                         src={task.adminMail.profile? task.adminMail.profile.image_url: profile}
                         alt=""
                       /> <div className="d-flex flex-column">
                       <span>{task.adminMail.Email}</span>
                       <span>{accountAccess(task.adminMail.Account)}</span>
                       </div>
                       </div>
                        <span
                          style={{
                            border: darkMode
                              ? "1px solid var(--primaryDashColorDark)"
                              : "1px solid var(--primaryDashMenuColor)",
                          }}
                          className="px-2 py-1 text-center"
                        >
                          {task.department}
                        </span>
                      </div>
           
                   
                    <div className="my-3 d-flex flex-column gap-1">
                      <h6>Task Description</h6>
                      <span>{task.description}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between my-3">
                          <AvatarGroup images={task.employees} />
                        </div>
                    <div>
                      <div style={{ width: "100%", overflow: "auto" }}>
                        <h6>Task Details</h6>
                        <div style={{
              // maxHeight: "68vh",
              overflow: "auto",
              position: "relative",
            }}
            className="table-responsive p-2 mb-3">  
                        <table className="table">
                          <thead>
                            <tr>
                              <th
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --primaryDashMenuColor)"
                                    : "var(--primaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--primaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                Task Durations
                              </th>
                              <th
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --primaryDashMenuColor)"
                                    : "var(--primaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--primaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                Manager Email
                              </th>
                              <th
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --primaryDashMenuColor)"
                                    : "var(--primaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--primaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                Start Date
                              </th>
                              <th
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --primaryDashMenuColor)"
                                    : "var(--primaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--primaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                End Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --secondaryDashMenuColor)"
                                    : "var(--secondaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--secondaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                {task.duration} days
                              </td>
                              <td
                                  style={{
                                    verticalAlign: "middle",
                                    whiteSpace: "pre",
                                    background: darkMode
                                      ? "var( --secondaryDashMenuColor)"
                                      : "var(--secondaryDashColorDark)",
                                    color: darkMode
                                      ? "var(--secondaryDashColorDark)"
                                      : "var( --primaryDashMenuColor)",
                                    border: "none",
                                  }}
                                >
                                   <img
                         style={{
                           height: "30px",
                           width: "30px",
                           borderRadius: "50%",
                           objectFit: "cover",
                         }}
                         src={task.managerEmail.profile? task.managerEmail.profile.image_url: profile}
                         alt=""
                       />
                                  {task.managerEmail.Email}
                                </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --secondaryDashMenuColor)"
                                    : "var(--secondaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--secondaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                {new Date(task.startDate)
                                  .toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                  .replace(",", "")}
                              </td>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                  whiteSpace: "pre",
                                  background: darkMode
                                    ? "var( --secondaryDashMenuColor)"
                                    : "var(--secondaryDashColorDark)",
                                  color: darkMode
                                    ? "var(--secondaryDashColorDark)"
                                    : "var( --primaryDashMenuColor)",
                                  border: "none",
                                }}
                              >
                                {new Date(task.endDate)
                                  .toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                  .replace(",", "")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() => setTimeinfo("name")}
                          onMouseLeave={() => setTimeinfo(false)}
                          onClick={() => toggleTaskDetails(task._id)}
                        >
                          {expandedTaskId === task._id ? (
                            <span>
                              View Less <MdArrowDropUp className="fs-4" />
                            </span>
                          ) : (
                            <span>
                              {" "}
                              View Details <MdArrowDropDown className="fs-4" />
                            </span>
                          )}
                        </span>
                      </div>
                      {expandedTaskId === task._id && (
                        <div>
                          <div className="d-flex flex-column my-2">
                            <h6>Remarks</h6>
                            <span>{task.comment}</span>
                          </div>
                          <hr />
                          <div className="d-flex flex-column gap-2 my-2">
                            {task.status === "Completed" && (
                              <span className="border border-danger px-2 py-1 text-center">
                                This task is reject from your side but pending from
                                others.
                              </span>
                            )}
                            {task.status === "Rejected" ||
                              (task.status === "Pending" && (
                                <span className="border border-danger px-2 py-1 text-center">
                                  This task is reject from your side but pending
                                  from others.
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>) : (<div
          className="d-flex flex-column gap-3 align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <img
            style={{ width: "15rem", height: "auto" }}
            src={RequestImage}
            alt="No task found"
          />
          <p
            style={{
              color: darkMode
                ? "var(--primaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
          >
           There is no task found at this moment.
          </p>
        </div>)
      }

    </div>
  );
};

export default EmployeeRejectTask;
