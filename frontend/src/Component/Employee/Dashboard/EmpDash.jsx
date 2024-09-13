
// HrDash.jsx
import React from "react";
import MyTodaysLoginData from "../WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
import AdminNews from "../../../Utils/AdminNews/AdminNews";
import AttendanceCard from "../../../Utils/AttendanceCard/AttendanceCard";
import UpcomingBirthdays from "./CountData/UpcomingBirthdays";
import HolidayDash from "../../../Utils/HolidayDash/HolidayDash";
import TeamManager from "../../../Utils/Teams/TeamManager/TeamManager";
import EmployeeLeaveDash from "../../../Utils/EmployeeLeaveDash/EmployeeLeaveDash";
import TaskDash from "../../../Utils/TaskDash/TaskDash";


const EmpDash = () => {
 
  const displayComponents = [
    {
      component: <MyTodaysLoginData />,
      display: "col-12 col-md-6 col-lg-4 p-2",
    },
    {
      component: <EmployeeLeaveDash />,
      display: "col-12 col-md-6 col-lg-4 p-2",
    },
    { component: <AdminNews />, display: "col-12 col-md-6 col-lg-4 p-2" },
    { component: <AttendanceCard />, display: "col-12 col-md-6 col-lg-4 p-2" },
    { component: <TaskDash />, display: "col-12 col-md-6 col-lg-4 p-2" },
    {
      component: <UpcomingBirthdays />,
      display: "col-12 col-md-4 col-md-3 p-2",
    },
    { component: <HolidayDash />, display: "col-12 col-md-6 col-lg-4 p-2" },
    { component: <TeamManager />, display: "col-12 col-md-6 col-lg-4 p-2" },
  ];



  return (
    <div className="container-fluid pb-5">
      <div className="row align-items-center">
        {displayComponents.map(({ component, display }, index) => (
          <div key={index} className={display}>
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpDash;


// import React from "react";
// import "./EmpDash.css";
// import EmpTaskChart from "./EmpChart.jsx/EmpTaskChart";
// import WelcomeBoard from "../../../Pages/WelcomeBoard/WelcomeBoard";
// import MyTodaysLoginData from "../WelcomeBoard/MyTodaysLoginData/MyTodaysLoginData";
// import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
// import AttendanceDetails from "../attendance/AttendanceDetails";

// const HRDash = () => {
//   return (
//     <div className="container-fluid py-2 ">
//       <TittleHeader
//         title={"Dashboard"}
//         message={"View a comprehensive analysis of your data here."}
//       />
//       <MyTodaysLoginData />
//       <div className="row justif-content-between row-gap-4 mt-3 align-items-center">
//         <div className="col-12 col-lg-4">
//           <WelcomeBoard height={"252px"} />
//         </div>
//         <div className="col-12 col-lg-8">
//           <AttendanceDetails />
//         </div>
//       </div>
//       <div className="row justif-content-between row-gap-4 mt-3 align-items-center">
//         <div className="col-12">
//           <EmpTaskChart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HRDash;
