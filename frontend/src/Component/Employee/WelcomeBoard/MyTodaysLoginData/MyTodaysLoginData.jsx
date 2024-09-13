import React, { useEffect, useState } from "react";
import { MdOutlineWorkHistory, MdWorkHistory } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../../../Pages/config/config";
import { useTheme } from "../../../../Context/TheamContext/ThemeContext";
import { FiCoffee } from "react-icons/fi";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";


const MyTodaysLoginData = (props) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [empName, setEmpName] = useState(null);
  const { darkMode } = useTheme();

  const employeeId = localStorage.getItem("_id");
 
  useEffect(() => {
    const loadPersonalInfoData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/personal-info/` + employeeId,
          {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          }
        );
       
        setEmpName(response.data.FirstName);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadPersonalInfoData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Fetch today's attendance data for the employee
        const response = await fetch(
          `${BASE_URL}/api/employee/${employeeId}/today-attendance`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [employeeId]);

  if (!attendanceData) {
    return <div>Loading...</div>;
  }
  function convertMinutesToHoursAndMinutes(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    return hours + " h " + remainingMinutes + " min";
  }

  const labelData = [
    {
      icon: <IoLogInOutline className="text-success fs-5" />,
      iconBG: "#abf9a728",
      title: "Today's login time",
      data: attendanceData.loginTime ? attendanceData.loginTime : "--",
    },
    {
      icon: <IoLogOutOutline className="text-danger fs-5" />,
      iconBG: "#ff8e8621",
      title: "Today's logout time",
      data: attendanceData.logoutTime ? attendanceData.logoutTime : "--",
    },
    {
      icon: <FiCoffee className="text-warning fs-5" />,
      iconBG: "#fbff8021",
      title: "Total break taken",
      data: convertMinutesToHoursAndMinutes(attendanceData.totalBrake),
    },
    {
      icon: <MdOutlineWorkHistory className="text-primary fs-5" />,
      iconBG: "#deccfa2b",
      title: "Total login time",
      data: convertMinutesToHoursAndMinutes(attendanceData.totalLoginTime),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "17rem",
        color: darkMode ? "black" : "White",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="d-flex flex-wrap shadow-sm rounded-2 align-items-center justify-content-evenly"
    >
      {labelData.map((item, index) => (
        <Labels
          style={{
            background: darkMode
              ? "var(--primaryDashMenuColor)"
              : "var(--primaryDashColorDark)",
            height: "fit-content",
            border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
            width: "45%",
          }}
          TytleStyle={"d-flex align-items-center justify-content-between p-2"}
          baseStyle={{
            border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
          }}
          key={index}
          icon={item.icon}
          title={item.title}
          data={item.data}
          background={item.iconBG}
        />
      ))}
    </div>
  );
};

export default MyTodaysLoginData;

const Labels = ({
  title,
  data,
  icon,
  style,
  TytleStyle,
  background,
  baseStyle,
}) => {
  return (
    <div className="my-0 p-0 rounded-3" style={style}>
      <h4 className="my-1 text-center  fw-normal">{data}</h4>
      <div style={baseStyle} className="my-auto shadow rounded-3">
        <span className={TytleStyle}>
          {title}
          <span
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              background: background,
            }}
            className="d-flex align-items-center justify-content-center"
          >
            {icon}
          </span>
        </span>
      </div>
    </div>
  );
};

// countdown 9 10
// import React, { useEffect, useState } from "react";
// import { MdOutlineWorkHistory, MdWorkHistory } from "react-icons/md";
// import axios from "axios";
// import BASE_URL from "../../../../Pages/config/config";
// import { useTheme } from "../../../../Context/TheamContext/ThemeContext";
// import { FiCoffee } from "react-icons/fi";
// import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

// const MyTodaysLoginData = (props) => {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [empName, setEmpName] = useState(null);
//   const [countdown, setCountdown] = useState(null);
//   const { darkMode } = useTheme();

//   const employeeId = localStorage.getItem("_id");

//   useEffect(() => {
//     const loadPersonalInfoData = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/personal-info/` + employeeId,
//           {
//             headers: {
//               authorization: localStorage.getItem("token") || "",
//             },
//           }
//         );
//         setEmpName(response.data.FirstName);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     loadPersonalInfoData();
//   }, []);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/api/employee/${employeeId}/today-attendance`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch attendance data");
//         }
//         const data = await response.json();
//         setAttendanceData(data);

//         // Calculate the fixed time (9 hours and 10 minutes after login time)
//         if (data.loginTime) {
//           const loginDate = new Date(data.loginTime);
//           const fixedDate = new Date(loginDate.getTime() + 9 * 60 * 60 * 1000 + 10 * 60 * 1000);
//           startCountdown(fixedDate);
//         }
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, [employeeId]);

//   const startCountdown = (targetDate) => {
//     const calculateRemainingTime = () => {
//       const now = new Date();
//       const timeDifference = targetDate - now;
//       if (timeDifference <= 0) {
//         setCountdown("Time's up!");
//         clearInterval(intervalId);
//         return;
//       }

//       const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//       setCountdown(`${hours}h ${minutes}m ${seconds}s`);
//     };

//     calculateRemainingTime();
//     const intervalId = setInterval(calculateRemainingTime, 1000);
//     return intervalId;
//   };

//   if (!attendanceData) {
//     return <div>Loading...</div>;
//   }

//   function convertMinutesToHoursAndMinutes(minutes) {
//     var hours = Math.floor(minutes / 60);
//     var remainingMinutes = minutes % 60;

//     return hours + " h " + remainingMinutes + " min";
//   }

//   const labelData = [
//     {
//       icon: <IoLogInOutline className="text-success fs-5" />,
//       iconBG: "#abf9a728",
//       title: "Today's login time",
//       data: attendanceData.loginTime ? attendanceData.loginTime : "--",
//     },
//     {
//       icon: <IoLogOutOutline className="text-danger fs-5" />,
//       iconBG: "#ff8e8621",
//       title: "Today's logout time",
//       data: attendanceData.logoutTime ? attendanceData.logoutTime : "--",
//     },
//     {
//       icon: <FiCoffee className="text-warning fs-5" />,
//       iconBG: "#fbff8021",
//       title: "Total break taken",
//       data: convertMinutesToHoursAndMinutes(attendanceData.totalBrake),
//     },
//     {
//       icon: <MdOutlineWorkHistory className="text-primary fs-5" />,
//       iconBG: "#deccfa2b",
//       title: "Total login time",
//       data: convertMinutesToHoursAndMinutes(attendanceData.totalLoginTime),
//     },
//     {
//       icon: <MdWorkHistory className="text-info fs-5" />,
//       iconBG: "#a2d9f7",
//       title: "Countdown to 9 hours + 10 mins",
//       data: countdown ? countdown : "--",
//     }
//   ];

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "17rem",
//         color: darkMode ? "black" : "White",
//         background: darkMode ? "#F5F5F6" : "#161515f6",
//       }}
//       className="d-flex flex-wrap shadow-sm rounded-2 align-items-center justify-content-evenly"
//     >
//       {labelData.map((item, index) => (
//         <Labels
//           style={{
//             background: darkMode
//               ? "var(--primaryDashMenuColor)"
//               : "var(--primaryDashColorDark)",
//             height: "fit-content",
//             border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
//             width: "45%",
//           }}
//           TytleStyle={"d-flex align-items-center justify-content-between p-2"}
//           baseStyle={{
//             border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
//           }}
//           key={index}
//           icon={item.icon}
//           title={item.title}
//           data={item.data}
//           background={item.iconBG}
//         />
//       ))}
//     </div>
//   );
// };

// export default MyTodaysLoginData;

// const Labels = ({
//   title,
//   data,
//   icon,
//   style,
//   TytleStyle,
//   background,
//   baseStyle,
// }) => {
//   return (
//     <div className="my-0 p-0 rounded-3" style={style}>
//       <h4 className="my-1 text-center  fw-normal">{data}</h4>
//       <div style={baseStyle} className="my-auto shadow rounded-3">
//         <span className={TytleStyle}>
//           {title}
//           <span
//             style={{
//               height: "35px",
//               width: "35px",
//               borderRadius: "50%",
//               background: background,
//             }}
//             className="d-flex align-items-center justify-content-center"
//           >
//             {icon}
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";
// import { MdOutlineWorkHistory, MdWorkHistory } from "react-icons/md";
// import axios from "axios";
// import BASE_URL from "../../../../Pages/config/config";
// import { useTheme } from "../../../../Context/TheamContext/ThemeContext";
// import { FiCoffee } from "react-icons/fi";
// import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

// const MyTodaysLoginData = (props) => {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [empName, setEmpName] = useState(null);
//   const { darkMode } = useTheme();

//   const employeeId = localStorage.getItem("_id");
//   console.log(empName);

//   useEffect(() => {
//     const loadPersonalInfoData = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/personal-info/` + employeeId,
//           {
//             headers: {
//               authorization: localStorage.getItem("token") || "",
//             },
//           }
//         );
//         console.log(response.data.FirstName);
//         setEmpName(response.data.FirstName);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     loadPersonalInfoData();
//   }, [employeeId]);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         // Fetch today's attendance data for the employee
//         const response = await fetch(
//           `${BASE_URL}/api/employee/${employeeId}/today-attendance`,
//           {
//             headers: {
//               authorization: localStorage.getItem("token") || "",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch attendance data");
//         }
//         const data = await response.json();
//         setAttendanceData(data);
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, [employeeId]);

//   if (!attendanceData) {
//     return <div>Loading...</div>;
//   }

//   function convertMinutesToHoursAndMinutes(minutes) {
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     return `${hours} h ${remainingMinutes} min`;
//   }

//   const calculateCountdown = () => {
//     if (attendanceData && attendanceData.countdown) {
//       const countdownSeconds = attendanceData.countdown;
//       const hours = Math.floor(countdownSeconds / 3600);
//       const minutes = Math.floor((countdownSeconds % 3600) / 60);
//       const seconds = countdownSeconds % 60;

//       return `${hours} h ${minutes} min ${seconds} sec`;
//     }
//     return "N/A";
//   };

//   const formatLoginTime = () => {
//     if (Array.isArray(attendanceData.loginTime)) {
//       return attendanceData.loginTime.join(', ');
//     }
//     return attendanceData.loginTime || "--";
//   };

//   const formatLogoutTime = () => {
//     if (Array.isArray(attendanceData.logoutTime)) {
//       return attendanceData.logoutTime.join(', ');
//     }
//     return attendanceData.logoutTime || "--";
//   };

//   const labelData = [
//     {
//       icon: <IoLogInOutline className="text-success fs-5" />,
//       iconBG: "#abf9a728",
//       title: "Today's login time",
//       data: formatLoginTime(),
//     },
//     {
//       icon: <IoLogOutOutline className="text-danger fs-5" />,
//       iconBG: "#ff8e8621",
//       title: "Today's logout time",
//       data: formatLogoutTime(),
//     },
//     {
//       icon: <FiCoffee className="text-warning fs-5" />,
//       iconBG: "#fbff8021",
//       title: "Total break taken",
//       data: convertMinutesToHoursAndMinutes(attendanceData.totalBrake),
//     },
//     {
//       icon: <MdOutlineWorkHistory className="text-primary fs-5" />,
//       iconBG: "#deccfa2b",
//       title: "Total login time",
//       data: convertMinutesToHoursAndMinutes(attendanceData.totalLoginTime),
//     },
//     {
//       icon: <MdWorkHistory className="text-info fs-5" />,
//       iconBG: "#d1e7dd",
//       title: "Countdown Timer",
//       data: calculateCountdown(),
//     },
//   ];

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "17rem",
//         color: darkMode ? "black" : "White",
//         background: darkMode ? "#F5F5F6" : "#161515f6",
//       }}
//       className="d-flex flex-wrap shadow-sm rounded-2 align-items-center justify-content-evenly"
//     >
//       {labelData.map((item, index) => (
//         <Labels
//           style={{
//             background: darkMode
//               ? "var(--primaryDashMenuColor)"
//               : "var(--primaryDashColorDark)",
//             height: "fit-content",
//             border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
//             width: "45%",
//           }}
//           TytleStyle={"d-flex align-items-center justify-content-between p-2"}
//           baseStyle={{
//             border: darkMode ? "1px solid #1f1e1e46" : "1px solid #f5f5f693",
//           }}
//           key={index}
//           icon={item.icon}
//           title={item.title}
//           data={item.data}
//           background={item.iconBG}
//         />
//       ))}
//     </div>
//   );
// };

// export default MyTodaysLoginData;

// const Labels = ({
//   title,
//   data,
//   icon,
//   style,
//   TytleStyle,
//   background,
//   baseStyle,
// }) => {
//   return (
//     <div className="my-0 p-0 rounded-3" style={style}>
//       <h4 className="my-1 text-center fw-normal">{data}</h4>
//       <div style={baseStyle} className="my-auto shadow rounded-3">
//         <span className={TytleStyle}>
//           {title}
//           <span
//             style={{
//               height: "35px",
//               width: "35px",
//               borderRadius: "50%",
//               background: background,
//             }}
//             className="d-flex align-items-center justify-content-center"
//           >
//             {icon}
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// };
