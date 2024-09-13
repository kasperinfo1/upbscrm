import React, { useContext, useEffect } from "react";
import MyTodaysLoginData from "../../Employee/WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import TaskDashManager from "../../../Utils/TaskDash/TaskDashManager";
import EmployeeLeaveDash from "../../../Utils/EmployeeLeaveDash/EmployeeLeaveDash";
import { AttendanceContext } from "../../../Context/AttendanceContext/AttendanceContext";

const ManagerDash = () => {
  const {isLogin} = useContext(AttendanceContext);

  useEffect(()=>{

  }, [isLogin])
  const displayComponents = [
    { compName: <MyTodaysLoginData /> },
    { compName: <EmployeeLeaveDash /> },
    { compName: <AdminNews /> },
    { compName: <AttendanceCard /> },
    { compName: <TaskDashManager /> },
    { compName: <TeamManager /> },
    { compName: <HolidayDash /> },
    { compName: <UpcomingBirthdays /> },
  ];

  return (
    <div className="container-fluid py-2 px-3 pb-4">
      <div className="row row-gap-3 align-items-center">
        {displayComponents.map((Comp, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 p-2">
            <div>{Comp.compName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDash;
