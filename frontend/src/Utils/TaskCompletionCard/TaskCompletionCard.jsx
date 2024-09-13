import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { TbSubtask } from "react-icons/tb";
import CircularProgressBar from "./CircularProgressBar";
import axios from "axios";
import BASE_URL from "../../Pages/config/config";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  BsEmojiAngryFill,
  BsEmojiExpressionlessFill,
  BsEmojiLaughingFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiSunglassesFill,
} from "react-icons/bs";

const TaskCompletionCard = () => {
  const { darkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tasks`);
        setTasks(response.data);
      } catch (error) {
        setError("Error fetching tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      calculateCompletionPercentage(selectedDepartment);
      calculateTotalTasks(selectedDepartment);
    }
  }, [tasks, selectedDepartment]);

  const calculateCompletionPercentage = (department) => {
    const filteredTasks = department === "All" ? tasks : tasks.filter((task) => task.department === department);
    const completedTasks = filteredTasks.filter((task) => task.status === "Completed");
    const percentage = filteredTasks.length > 0 ? Math.round((completedTasks.length / filteredTasks.length) * 100) : 0;
    setCompletionPercentage(percentage);
  };

  const calculateTotalTasks = (department) => {
    const filteredTasks = department === "All" ? tasks : tasks.filter((task) => task.department === department);
    const completedTasks = filteredTasks.filter((task) => task.status === "Completed");
    const totalData = filteredTasks.length > 0 ? `${completedTasks.length} / ${filteredTasks.length}` : "0";
    setTotalData(totalData);
  };

  const handleDepartmentChange = (event) => setSelectedDepartment(event.target.value);

  const departmentOptions = useMemo(() => Array.from(new Set(tasks.map((task) => task.department))), [tasks]);

  const getEmojiAndLabel = () => {
    if (completionPercentage < 15) return { label: "Unsatisfy", icon: <BsEmojiAngryFill />, badgeClass: "badge-danger" };
    if (completionPercentage < 30) return { label: "Bad", icon: <BsEmojiExpressionlessFill />, badgeClass: "badge-Semidanger" };
    if (completionPercentage < 45) return { label: "Neutral", icon: <BsEmojiNeutralFill />, badgeClass: "badge-Semiwarning" };
    if (completionPercentage < 60) return { label: "Good", icon: <BsEmojiSmileFill />, badgeClass: "badge-warning" };
    if (completionPercentage < 75) return { label: "Satisfied", icon: <BsEmojiLaughingFill />, badgeClass: "badge-success" };
    return { label: "Excellent", icon: <BsEmojiSunglassesFill />, badgeClass: "badge-success" };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { label, icon, badgeClass } = getEmojiAndLabel();

  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        color: darkMode ? "black" : "white",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="p-2 px-3 shadow-sm rounded-2 d-flex flex-column gap-2"
    >
      <h5 className="my-0 fw-normal d-flex align-items-center gap-2">
        <TbSubtask /> Task Completion Rate
      </h5>
      <div
        style={{
          height: "13.5rem",
          overflow: "auto",
          background: darkMode ? "#ededf1d4" : "#252424c3",
        }}
        className="rounded-3 p-2 py-2"
      >
        <div style={{height:'9rem'}} className="row w-100 mx-auto">
          <div className="col-6 p-2">
            <h6>Average submission</h6>
            <div className="d-flex align-items-center gap-3">
              <h2 className="fw-bold" style={{ color : completionPercentage < 25 ? "#C7253E" : 
                completionPercentage < 50 ? "#E85C0D" : 
                completionPercentage < 75 ? "#FABC3F" :  
                "#41B06E", fontSize:'1.8rem'}}>{totalData}</h2>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0 .5rem' }} className={`${darkMode ? `${badgeClass} p-2` : `${badgeClass}-dark p-2`}`}>
                {label} {icon}
              </span>
            </div>
          </div>
          <div className="col-6 p-1">
            <CircularProgressBar
              percentage={completionPercentage}
              background={completionPercentage < 25 ? "#C7253E" : 
                completionPercentage < 50 ? "#E85C0D" : 
                completionPercentage < 75 ? "#FABC3F" :  
                "#41B06E"}
              color={completionPercentage < 25 ? "#C7253E" : 
                completionPercentage < 50 ? "#E85C0D" : 
                completionPercentage < 75 ? "#FABC3F" :  
                "#41B06E"}
            />
          </div>
        </div>
        <div style={{height:'4rem'}} className="row py-2  mx-auto w-100">
          <div className="col-6 d-flex justify-content-center flex-column">
            {/* <label htmlFor="department-select">Select Task</label> */}
            <select
              id="department-select" style={{padding:'.4rem .6rem .4rem .8rem'}}
              className="form-select"
              onChange={handleDepartmentChange}
              value={selectedDepartment}
            >
              <option value="All">All Departments</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <Link
              to="/admin/task" style={{padding:'.4rem .6rem .4rem .8rem'}}
              className="btn bg-light  shadow-sm d-flex gap-2 rounded-5 border-0"
            >
              <h6 className="m-0 my-auto">Add task</h6>
              <span
                style={{ height: "30px", width: "30px", borderRadius: "50%" }}
                className="d-flex shadow align-items-center justify-content-center"
              >
                +
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionCard;
