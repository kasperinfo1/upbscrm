import React, { useEffect, useState } from "react";
import EmployeeNewTask from "../EmployeeNewTask";
import EmployeeActiveTask from "../EmployeeActiveTask";
import EmployeeCompletedTask from "../EmployeeCompleteTask";
import EmployeeRejectTask from "../EmployeeRejectTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../../redux/slices/tasksSlice";
// import TittleHeader from "../../../../Pages/TittleHeader/TittleHeader";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("_id");
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const email = localStorage.getItem("Email");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const [activeTask, setActiveTask] = useState("newTask");

  const renderTaskComponent = () => {
    switch (activeTask) {
      case "activeTask":
        return <EmployeeActiveTask />;
      case "taskComplete":
        return <EmployeeCompletedTask />;
      case "taskReject":
        return <EmployeeRejectTask />;
      default:
        return <EmployeeNewTask />;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center gap-2 justify-content-end">
        <button
          className="btn shadow-sm "
          style={{
            background: activeTask === "newTask" ? "#5d62e89a" : "#F5F5F5",
            color: activeTask === "newTask" ? "#F5F5F5" : "#1b20a4d3",
          }}
          onClick={() => setActiveTask("newTask")}
        >
          New Task
        </button>
        <button
          className="btn shadow-sm border"
          style={{
            background: activeTask === "activeTask" ? "#5d62e89a" : "#F5F5F5",
            color: activeTask === "activeTask" ? "#F5F5F5" : "#1b20a4d3",
          }}
          onClick={() => setActiveTask("activeTask")}
        >
          Active Task
        </button>
        <button
          className="btn shadow-sm "
          style={{
            background: activeTask === "taskComplete" ? "#5d62e89a" : "#F5F5F5",
            color: activeTask === "taskComplete" ? "#F5F5F5" : "#1b20a4d3",
          }}
          onClick={() => setActiveTask("taskComplete")}
        >
          Completed Task
        </button>
        <button
          className="btn shadow-sm "
          style={{
            background: activeTask === "taskReject" ? "#5d62e89a" : "#F5F5F5",
            color: activeTask === "taskReject" ? "#F5F5F5" : "#1b20a4d3",
          }}
          onClick={() => setActiveTask("taskReject")}
        >
          Rejected Task
        </button>
      </div>
      <div className="">{renderTaskComponent()}</div>
    </div>
  );
};

export default TaskContainer;
