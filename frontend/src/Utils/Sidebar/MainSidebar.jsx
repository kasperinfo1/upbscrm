import React, { useState } from "react";
import { GoTasklist } from "react-icons/go";
import Logo from "../../img/logo.webp";
import {
  MdCurrencyRupee,
  MdKeyboardArrowRight,
  MdMenuOpen,
  MdOutlineContacts,
  MdOutlineDashboardCustomize,
  MdOutlineLocationOn,
} from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import "./MainSidebar.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoIosHelpCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCalendarOutline, IoCashOutline, IoTicketOutline } from "react-icons/io5";
import { LuKeyRound, LuLayoutDashboard, LuPartyPopper } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { ImCalendar } from "react-icons/im";
import { TbBeach, TbUserCheck } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

const MainSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const [extended, setExtended] = useState(false);
  const { darkMode } = useTheme();
  const allLinks = [
    {
      user: "1",
      icon: <MdOutlineDashboardCustomize />,
      name: "Dashboard",
      navLinks: [{ to: "/admin/dashboard", label: "Dashboard" }],
    },
    {
      user: "1",
      icon: <RiUser3Line />,
      name: "Employee",
      navLinks: [
        // { to: "/admin/user", label: "Employee List" },
        { to: "/admin/employee", label: "Employee List" },
      ],
    },
    {
      user: "1",
      icon: <MdCurrencyRupee />,
      name: "Salary",
      navLinks: [{ to: "/admin/salary", label: "Salary" }],
    },
    {
      user: "1",
      icon: <IoMdCheckmarkCircleOutline />,
      name: "Attendance",
      navLinks: [
        { to: "/admin/myAttendance", label: "My Attendance" },
        { to: "/admin/updateAttendance", label: "Update Attendance" },

        // { to: "/admin/adminAttendance", label: "Create Attendance" },
        { to: "/admin/todaysAttendance", label: "TodaysAttendance" },
        { to: "/admin/AttendanceRegister", label: "Attendance Register" },
        { to: "/admin/viewAttendance", label: "View Attendance" },
        // { to: "/admin/leave", label: "View Leave " }
      ],
    },
    {
      user: "1",
      icon: <IoCalendarOutline />,
      name: "Leave",
      navLinks: [
        // { to: "/admin/applyLeave", label: "Apply Leave" },
        { to: "/admin/leaveApplication", label: "Leave Request" },
        { to: "/admin/leaveAccepted", label: "Approved Leaves " },
        { to: "/admin/leaveRejected", label: "Rejected Leaves " },
        { to: "/admin/leaveAssign", label: "Leave Assign" },
        { to: "/admin/AllEmpLeave", label: "All Emp Leave Balance" },
      ],
    },
    {
      user: "1",
      icon: <GoTasklist />,
      name: "Task",
      navLinks: [
        { to: "/admin/task", label: "Create New Task" },
        { to: "/admin/taskassign", label: "Assigned" },
        { to: "/admin/taskActive", label: "Active Task" },
        { to: "/admin/taskcancle", label: "Cancelled Task" },
        { to: "/admin/taskcomplete", label: "Completed Task" },
        { to: "/admin/taskreject", label: "Rejected Task" },
      ],
    },
    {
      user: "1",
      icon: <LuKeyRound />,
      name: "Access",
      navLinks: [
        { to: "/admin/role", label: "Role" },
        { to: "/admin/position", label: "Position" },
        { to: "/admin/department", label: "Department" },
      ],
    },
    {
      user: "1",
      icon: <HiOutlineBuildingOffice2 />,
      name: "Company",
      navLinks: [
        { to: "/admin/company", label: "Company List" },
        // { to: "/hr/employee", label: "Create Employee" },
      ],
    },
    {
      user: "1",
      icon: <IoLocationOutline />,
      name: "Address",
      navLinks: [
        { to: "/admin/country", label: "Country" },
        { to: "/admin/state", label: "State" },
        { to: "/admin/city", label: "City" },
      ],
    },
    {
      user: "1",
      icon: <HiOutlineSpeakerphone />,
      name: "Notice",
      navLinks: [{ to: "/admin/NoticeManagement", label: "Notice" }],
    },
    {
      user: "1",
      icon: <IoIosHelpCircleOutline />,
      name: "Request Details",
      navLinks: [
        { to: "/admin/requestReceived", label: "Request Open" },
        { to: "/admin/requestClosed", label: "Request Closed" },
      ],
    },
    {
      user: "1",
      icon: <LuPartyPopper />,
      name: "Holiday",
      navLinks: [{ to: "/admin/leaveCal", label: "Leave Calendar" }],
    },
    {
      user: "1",
      icon: <AiOutlineFundProjectionScreen />,
      name: "Project",
      navLinks: [
        { to: "/admin/project-bid", label: "Project Bidding" },
        { to: "/admin/portal-master", label: "Portal Master" },
      ],
    },
    {
      user: "2",
      icon: <LuLayoutDashboard />,
      name: "Dashboard",
      navLinks: [
        { to: "/hr/dashboard", label: "Dashboard" }
      ],
    },
    {
      user: "2",
      icon: <PiUsersThree />,
      name: "Employee",
      navLinks: [{ to: "/hr/employee", label: "Employee List" }],
    },
    {
      user: "2",
      icon: <IoCashOutline />,
      name: "Salary",
      navLinks: [{ to: "/hr/salary", label: "Salary" }],
    },
    {
      user: "2",
      icon: <TbUserCheck />,
      name: "Attendance",
      navLinks: [
        { to: "/hr/attenDance", label: "Create Attendance" },
        { to: "/hr/AttendanceRegister", label: "Attendance Register" },
        { to: "/hr/todaysAttendance", label: "TodaysAttendance" },
        { to: "/hr/viewAttenDance", label: "View Attendance" },
        { to: "/hr/manualAttand", label: "Manual Attendance" },
        { to: "/hr/updateAttendance", label: "Update Attendance" },

      ],
    },
    {
      user: "2",
      icon: <TbBeach />,
      name: "Leave",
      navLinks: [
        { to: "/hr/createLeave", label: "Apply Leave" },
        { to: "/hr/leaveApplication", label: "Pending " },
        { to: "/hr/leaveAccepted", label: "Accepted " },
        { to: "/hr/leaveRejected", label: "Rejected " },
        { to: "/hr/assignLeave", label: "Assign Leave" },
        { to: "/hr/allEmpLeave", label: "All Emp Leave" },
        // { to: "/hr/leaveBalance", label: "Leave Balance" },
      ],
    },
    // {  user: "2",
    //   icon: <MdTaskAlt />,
    //   name: "Task",
    //   navLinks: [
    //     { to: "/hr/newTask", label: "Assign New Task" },
    //     { to: "/hr/ActiveTask", label: "Active Task" },
    //     { to: "/hr/taskcancle", label: "Cancelled Task" },
    //     { to: "/hr/taskcomplete", label: "Completed Task" },
    //     { to: "/hr/rejectTask", label: "Rejected Task" },
    //   ],
    // },
    {
      user: "2",
      icon: <MdOutlineContacts />,
      name: "Access",
      navLinks: [
        { to: "/hr/role", label: "Role" },
        { to: "/hr/position", label: "Position" },
        { to: "/hr/department", label: "Department" },
      ],
    },
    {
      user: "2",
      icon: <HiOutlineBuildingOffice2 />,
      name: "Company",
      navLinks: [{ to: "/hr/company", label: "Company List" }],
    },
    {
      icon: <MdOutlineLocationOn />,
      name: "Address",
      navLinks: [
        { to: "/hr/country", label: "Country" },
        { to: "/hr/state", label: "State" },
        { to: "/hr/city", label: "City" },
      ],
    },
    {
      user: "2",
      icon: <HiOutlineSpeakerphone />,
      name: "Notice",
      navLinks: [{ to: "/hr/NoticeManagement", label: "Notice" }],
    },
    {
      user: "2",
      icon: <IoTicketOutline />,
      name: "My Request",
      navLinks: [
        { to: "/hr/request", label: "Raise Request" },
        { to: "/hr/requestOpen", label: "Open Request" },
        { to: "/hr/requestClosed", label: "Closed Request" },

      ],
  
    },
    {
      user: "2",
      icon: <IoIosHelpCircleOutline />,
      name: "Team Request",
      navLinks: [
        { to: "/hr/teamRequestOpen", label: "Open Request" },
        { to: "/hr/teamRequestClosed", label: "Closed Request" },

      ],
  
    },
    {
      user: "2",
      icon: <ImCalendar />,
      name: "Holiday",
      navLinks: [{ to: "/hr/holiday", label: "Holiday Calendar" }],
    },
    {
      user: "2",
      icon: <FaRegCircleUser />,
      name: "Profile",
      navLinks: [{ to: "/hr/personal-info", label: "Profile" }],
    },
    {
      user: "4",
      icon: <MdOutlineDashboardCustomize />,
      name: "Dashboard",
      navLinks: [{ to: "/manager/dashboard", label: "Dashboard" }],
    },
    {
      user: "4",
      icon: <IoMdCheckmarkCircleOutline />,
      name: "Attendance",
      navLinks: [
        { to: "/manager/myAttendance", label: "My Attencance" },
        { to: "/manager/todaysAttendance", label: "TodaysAttendance" },
        { to: "/manager/viewAttenDance", label: "View Attendance" },
      ],
    },
    {
      user: "4",
      icon: <IoCalendarOutline />,
      name: "Leave",
      navLinks: [
        { to: "/manager/createLeave", label: "My Leave" },
        { to: "/manager/leaveApplication", label: "Leave Requests" },
        { to: "/manager/leaveApplicationAccepted", label: "Accepted Leave " },
        { to: "/manager/leaveApplicationRejected", label: "Rejected Leave " },
      ],
    },
    {
      user: "4",
      icon: <GoTasklist />,
      name: "Task",
      navLinks: [
        { to: "/manager/newTask", label: "Assign New Task" },
        { to: "/manager/ActiveTask", label: "Active Task" },
        { to: "/manager/taskcancle", label: "Cancelled Task" },
        { to: "/manager/taskcomplete", label: "Completed Task" },
        { to: "/manager/rejectTask", label: "Rejected Task" },
      ],
    },

    {
      user: "4",
      icon: <HiOutlineSpeakerphone />,
      name: "Notice",
      navLinks: [{ to: "/manager/NoticeManagement", label: "Notice" }],
    },
    {
      user: "4",
      icon: <IoTicketOutline />,
      name: "My Request",
      navLinks: [
        { to: "/manager/request", label: "Raise Request" },
        { to: "/manager/requestOpen", label: "Open Request" },
        { to: "/manager/requestClosed", label: "Closed Request" },

      ],
  
    },
    {
      user: "4",
      icon: <IoIosHelpCircleOutline />,
      name: "Team Request",
      navLinks: [
        { to: "/manager/teamRequestOpen", label: "Open Request" },
        { to: "/manager/teamRequestClosed", label: "Closed Request" },

      ],
  
    },

    {
      user: "4",
      icon: <FaRegUserCircle />,
      name: "Profile",
      navLinks: [{ to: "/manager/personal-info", label: "Profile" }],
    },
    {
      user: "3",
      icon: <FaRegUser />,
      name: "Dashboard",
      navLinks: [{ to: "/employee/dashboard", label: "Dashboard" }],
    },
    {
      user: "3",
      icon: <FaRegCircleUser />,
      name: "Profile",
      navLinks: [
        {
          to: "/employee/" + localStorage.getItem("_id") + "/personal-info",
          label: "Profile",
        },
      ],
    },
    {
      user: "3",
      icon: <IoMdCheckmarkCircleOutline className="fs-4" />,
      name: "Attendance",
      navLinks: [
        {
          to: "/employee/MyAttendance",
          label: "View Attendance",
        },
      ],
    },
    {
      user: "3",
      icon: <IoCalendarOutline />,
      name: "Leave",
      navLinks: [
        {
          to: "/employee/leaveApplication",
          label: "Apply Leave",
        },
      ],
    },
    {
      user: "3",
      icon: <GoTasklist />,
      name: "Task",
      navLinks: [{ to: "/employee/task", label: "Task" }],
    },
    {
      user: "3",
      icon: <IoTicketOutline />,
      name: "Request",
      navLinks: [
        { to: "/employee/request", label: "Raise Request" },
        { to: "/employee/requestOpen", label: "Open Request" },
        { to: "/employee/requestClosed", label: "Closed Request" },

      ],
  
    },
  ];

  const LoginUser = localStorage.getItem("Account");

  const toggleDropdown = (name) => {
    if (activeCategory === name) {
      setActiveCategory(null);
    } else {
      setActiveCategory(name);
    }
  };

  const ExtendClick = () => {
    setExtended((prev) => !prev);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        overflow: "inherit",
        width: "fit-content",
        borderRight: "1px solid rgba(90, 88, 88, 0.1)",
        backgroundColor: darkMode
          ? "var(--primaryDashMenuColor)"
          : "var(--primaryDashColorDark)",
        padding: ".5rem 1rem .5rem .5rem",
      }}
      className="d-none d-sm-flex flex-column gap-2"
    >
      <h3
        style={{ borderBottom: "2px solid #DE4E26", height: "7vh" }}
        className="text-success  justify-content-between d-flex gap-2"
      >
        <button
          style={{
            display: activeCategory || extended ? "block" : "none",
            cursor: "none",
          }}
          className=" btn text-white rounded-0 py-0"
        >
          {activeCategory || extended ? (
            <img style={{width:'3rem' }} src={Logo} alt="" />
          ) : (
            <img style={{width:'3rem' }} src={Logo} alt="" />
          )}
        </button>
        <span
          onClick={ExtendClick}
          style={{
            border: "none",
            outline: "none",
            cursor: "pointer",
            color: darkMode
              ? "var(--primaryDashColorDark)"
              : "var(--primaryDashMenuColor)",
            transform: `rotate(${!extended ? "180deg" : "0deg"})`,
          }}
          className="my-auto px-1 fs-4"
        >
          <MdMenuOpen />
        </span>
      </h3>

      <div
        className="m-0 py-2 px-1 d-flex flex-column gap-1 custom-scrollbar"
        style={{
          height: "calc(100vh - 20vh)",
          overflow: "auto",
        }}
      >
        {allLinks
          .filter((links) => links.user === LoginUser)
          .map(({ icon, name, navLinks }) =>
            navLinks.length > 1 ? (
              <div
                key={name}
                onClick={() => toggleDropdown(name)}
                className="position-relative rounded-5"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    !extended ? (
                      <Tooltip id={`tooltip-${name}`}>{name}</Tooltip>
                    ) : (
                      <span></span>
                    )
                  }
                >
                  <span
                    style={{
                      color: darkMode
                        ? "var(--primaryDashColorDark)"
                        : "var(--primaryDashMenuColor)",
                      height: "3rem",
                      outline: "none",
                      border: "none",
                    }}
                    className="p-0 px-1 rounded-2  text-start gap-2 justify-between w-100 d-flex justify-content-between"
                  >
                    <div
                      style={{ width: "fit-content" }}
                      className="d-flex gap-2 my-auto"
                    >
                      <p
                        style={{
                          height: "30px",
                          width: "30px",
                          alignItems: "center",
                          color: darkMode
                            ? "var(--primaryDashColorDark)"
                            : "var(--primaryDashMenuColor)",
                        }}
                        className="m-auto d-flex rounded-5 justify-content-center fs-5"
                      >
                        {icon}
                      </p>
                      <p
                        style={{
                          display:
                            activeCategory || extended ? "block" : "none",
                        }}
                        className="my-auto"
                      >
                        {name}
                      </p>
                    </div>
                    <span
                      style={{
                        transform: `rotate(${
                          activeCategory === name ? "90deg" : "0deg"
                        })`,
                        transition: "1s ease",
                        display: activeCategory || extended ? "block" : "none",
                      }}
                      className="my-auto fs-4"
                    >
                      <MdKeyboardArrowRight />
                    </span>
                  </span>
                </OverlayTrigger>

                <div
                  style={{
                    ...dropdownStyle,
                    display: activeCategory === name ? "flex" : "none",
                    width: "fit-content",
                    borderLeft: "1px solid gray",
                    paddingLeft: ".5rem",
                    marginLeft: ".6rem",
                  }}
                  className="flex-column  start-100 py-0 gap-2 mt-0"
                >
                  {navLinks.map((link) => (
                    <NavLink
                      className="text-decoration-none py-2 px-1 rounded-3"
                      key={link.to}
                      to={link.to}
                    >
                      <div
                        style={{
                          color: darkMode
                            ? "var(--primaryDashColorDark)"
                            : "var(--primaryDashMenuColor)",
                        }}
                        className="text-decoration-none flex-nowrap text-start gap-3 d-flex justify-content-between"
                      >
                        <div className="d-flex gap-1 flex-nowrap">
                          <p className="m-0">{link.icon}</p>
                          <p style={{ whiteSpace: "pre" }} className="m-auto">
                            {link.label}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <OverlayTrigger
                key={name}
                placement="right"
                overlay={
                  !extended ? (
                    <Tooltip id={`tooltip-${name}`}>{name}</Tooltip>
                  ) : (
                    <span></span>
                  )
                }
              >
                <NavLink to={navLinks[0].to} className="text-decoration-none rounded-3">
                  <span
                    style={{
                      color: darkMode
                        ? "var(--primaryDashColorDark)"
                        : "var(--primaryDashMenuColor)",
                      height: "3rem",
                      outline: "none",
                      border: "none",
                    }}
                    className="p-0 px-1 rounded-2 text-start gap-2 justify-between w-100 d-flex justify-content-between"
                  >
                    <div
                      style={{ width: "fit-content" }}
                      className="d-flex gap-2 my-auto"
                    >
                      <p
                        style={{
                          height: "30px",
                          width: "30px",
                          alignItems: "center",
                          color: darkMode
                            ? "var(--primaryDashColorDark)"
                            : "var(--primaryDashMenuColor)",
                        }}
                        className="m-auto d-flex rounded-5 justify-content-center fs-5"
                      >
                        {icon}
                      </p>
                      <p
                        style={{
                          display:
                            activeCategory || extended ? "block" : "none",
                        }}
                        className="my-auto"
                      >
                        {name}
                      </p>
                    </div>
                  </span>
                </NavLink>
              </OverlayTrigger>
            )
          )}
      </div>
      <div
        style={{ height: "10vh" }}
        className="d-flex align-items-center justify-content-start gap-2 mx-2 ms-3"
      ></div>
    </div>
  );
};

const dropdownStyle = {
  width: "250px",
  zIndex: "5",
  borderLeft: "5px solid white",
};

export default MainSidebar;
