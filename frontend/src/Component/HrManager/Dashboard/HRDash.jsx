import React, { useContext, useEffect } from "react";
import MyTodaysLoginData from "../../Employee/WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import UpcomingBirthdays from "../../Employee/Dashboard/CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import LeaveComponentHrDash from "../../../Utils/LeaveComponentHrDash/LeaveComponentHrDash";
import EmployeeLeaveDash from "../../../Utils/EmployeeLeaveDash/EmployeeLeaveDash";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import EmployeeStatus from "../../../Utils/EmployeeStatus/EmployeeStatus";
import './HRDash.css';
import { AttendanceContext } from "../../../Context/AttendanceContext/AttendanceContext";

const HRDash = () => {
  const {isLogin} = useContext(AttendanceContext);

  useEffect(()=>{

  }, [isLogin])
  return (
    <div className="d-flex flex-column row-gap-4 py-3 px-3  container-fluid">
      <div className="row row-gap-4">
        <div className="col-12 colm-md-6 col-lg-4">
        <MyTodaysLoginData/>
        </div>
        <div className="col-12 colm-md-6 col-lg-4">
        <EmployeeLeaveDash/>
        </div>
        <div className="col-12 colm-md-6 col-lg-4">
        <AdminNews/>
        </div>
      </div>
      <div className="row row-gap-4">
        <div className="col-12 col-md-8 col-lg-8 row row-gap-4">
        <div className="col-12 col-md-6">
        <AttendanceCard/>
      </div>
      <div className="col-12 col-md-6">
      <LeaveComponentHrDash/>
      </div>
      <div className="col-12 col-md-6">
      <HolidayDash/>
      </div>
      <div className="col-12 col-md-6">
      <UpcomingBirthdays/>
      </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
        <div>
        <EmployeeStatus/>
      </div>
        </div>
      </div>
  
    </div>
  );
};

export default HRDash;



