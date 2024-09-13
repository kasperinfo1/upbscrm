import React, { useState, useContext, useEffect } from "react";
import "./LeaveApplicationHR.css";
import axios from "axios";
import LeaveApplicationHRFormEdit from "./LeaveApplicationHRFormEdit.jsx";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext.js";
import BASE_URL from "../../Pages/config/config.js";
import { v4 as uuid } from "uuid";
import LeaveApplicationHRTableRejected from "./LeaveApplicationHRTableRejected.jsx";
const LeaveApplicationHR = (props) => {
  const [table, setTable] = useState(true);
  const { socket } = useContext(AttendanceContext);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [empData, setEmpData] = useState(null);
  const email = localStorage.getItem("Email");
  const name = localStorage.getItem("Name");
  const id = localStorage.getItem("_id");
    
  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/particularEmployee/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setEmpData(response.data);
      })
      .catch((error) => {
          
      });
  };
  useEffect(() => {
    loadEmployeeData();
  }, []);
    
  const handleLeaveApplicationHRSubmit = (event) => {
    event.preventDefault();
      
    setTable(true);

    let body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Status: event.target[3].value,
      Reasonforleave: event.target[4].value,
    };
    axios
      .post(`${BASE_URL}/api/leave-application-hr/` + props.data["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
          
      });
  };

  const handleAddLeaveApplicationHR = () => {
      
    setTable(false);
  };

  const handleEditLeaveApplicationHR = (e) => {
      
      
    setEditForm(true);
    setEditData(e);
    // Assuming setEditFormGender is not used in the rest of your component
    // setEditFormGender(e["Gender"]);
  };

  const handleFormClose = () => {
      
    setTable(true);
  };
  const restoringLeave = (id, email, leaveType, totalLeaveRequired) => {
      
    axios
      .post(
        `${BASE_URL}/api/rejectedLeave`,
        { id, email, leaveType, totalLeaveRequired },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
          
      })
      .catch((err) => {
          
      });
  };

  const handleEditFormClose = () => {
      
    setEditForm(false);
  };
  function dateDifference(date1, date2) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const differenceInTime = secondDate.getTime() - firstDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.abs(differenceInDays);
  }
  const handleLeaveApplicationHREditUpdate = (info, newInfo) => {
      
    newInfo.preventDefault();

    let body = {
      Status: newInfo.target[3].value,
      updatedBy: `${empData["FirstName"]} ${empData["LastName"]}`,
    };

    const taskId = uuid();
    let leaveStatus = "";
      
    if (body.Status === "2") {
        
      leaveStatus = "Approved";
      axios
        .put(`${BASE_URL}/api/leave-application-hr/` + info["_id"], body, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          setTable(false);
          setTable(true);
            

          if (empData.profile) {
            const data = {
              taskId,
              employeeEmail: info.Email,
              hrEmail: info.reportHr,
              reportManager:
                email === info.aditionalManager
                  ? info.reportManager
                  : info.aditionalManager,
              message: `Leave ${leaveStatus}`,
              messageBy: name,
              profile: empData.profile.image_url,
              status: "unseen",
              path: empData.Account === 1 ? "createLeave" : "leaveApplication",
            };

            socket.emit("leaveManagerStatusNotification", data);
          } else {
            const data = {
              taskId,
              employeeEmail: info.Email,
              hrEmail: info.reportHr,
              reportManager:
                email === info.aditionalManager
                  ? info.reportManager
                  : info.aditionalManager,
              message: `Leave ${leaveStatus}`,
              messageBy: name,
              profile: null,
              status: "unseen",
              path: empData.Account === 1 ? "createLeave" : "leaveApplication",
            };

            socket.emit("leaveManagerStatusNotification", data);
          }
        })
        .catch((err) => {
            
        });
    } else if (body.Status === "3") {
      leaveStatus = "Rejected";
        
      let reason = prompt("Please provide reason of rejection");
      body["reasonOfRejection"] = reason;

      axios
        .put(`${BASE_URL}/api/leave-application-hr/` + info["_id"], body, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          setTable(false);
          setTable(true);
            
          let totalLeaveRequired =
            dateDifference(info.FromDate, info.ToDate) + 1;
          restoringLeave(
            info.empObjID,
            info.Email,
            info.Leavetype,
            totalLeaveRequired
          );
          if (empData.profile) {
            const data = {
              taskId,
              employeeEmail: info.Email,
              hrEmail: info.reportHr,
              reportManager:
                email === info.aditionalManager
                  ? info.reportManager
                  : info.aditionalManager,
              message: `Leave ${leaveStatus}`,

              messageBy: name,
              profile: empData.profile.image_url,
              status: "unseen",
              path: empData.Account === 1 ? "createLeave" : "leaveApplication",
            };
              
            socket.emit("leaveManagerStatusNotification", data);
          } else {
            const data = {
              taskId,
              employeeEmail: info.Email,
              hrEmail: info.reportHr,
              reportManager:
                email === info.aditionalManager
                  ? info.reportManager
                  : info.aditionalManager,
              message: `Leave ${leaveStatus}`,

              messageBy: name,
              profile: null,
              status: "unseen",
              path: empData.Account === 1 ? "createLeave" : "leaveApplication",
            };
              
            socket.emit("leaveManagerStatusNotification", data);
          }
        })
        .catch((err) => {
            
        });
    }

    setEditForm(false);
  };

  return (
    <React.Fragment>
      {table ? (
        editForm ? (
          <LeaveApplicationHRFormEdit
            onLeaveApplicationHREditUpdate={handleLeaveApplicationHREditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
            // onFormClose={handleFormClose}
          />
        ) : (
          <LeaveApplicationHRTableRejected
            onAddLeaveApplicationHR={handleAddLeaveApplicationHR}
            onEditLeaveApplicationHR={handleEditLeaveApplicationHR}
            data={props.data}
          />
        )
      ) : (
        <div></div>
        // Uncomment the following code if needed
        // <LeaveApplicationHRForm
        //   onLeaveApplicationHRSubmit={handleLeaveApplicationHRSubmit}
        //   onFormClose={handleFormClose}
        //   onGenderChange={handleAddFormGenderChange}
        // />
      )}
    </React.Fragment>
  );
};

export default LeaveApplicationHR;

// import React, { useState, useContext, useEffect } from "react";
// import "./LeaveApplicationHR.css";
// import axios from "axios";
// import LeaveApplicationHRTable from "./LeaveApplicationHRTable.jsx";
// import LeaveApplicationHRFormEdit from "./LeaveApplicationHRFormEdit.jsx";
// import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext.js";
// import { v4 as uuid } from "uuid";
// const LeaveApplicationHR = (props) => {
//   const [table, setTable] = useState(true);
//   const { socket } = useContext(AttendanceContext);
//   const [editForm, setEditForm] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [empData, setEmpData] = useState(null);
//   const email = localStorage.getItem("Email");
//   const name = localStorage.getItem("Name");
//   const id = localStorage.getItem("_id");
//     
//   const loadEmployeeData = () => {
//     axios
//       .get(`http://localhost:4000/api/particularEmployee/${id}`, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((response) => {
//           
//         setEmpData(response.data);
//       })
//       .catch((error) => {
//           
//       });
//   };
//   useEffect(() => {
//     loadEmployeeData();
//   }, []);
//     
//   const handleLeaveApplicationHRSubmit = (event) => {
//     event.preventDefault();
//       
//     setTable(true);

//     let body = {
//       Leavetype: event.target[0].value,
//       FromDate: event.target[1].value,
//       ToDate: event.target[2].value,
//       Status: event.target[3].value,
//       Reasonforleave: event.target[4].value
//     };
//     axios
//       .post(
//         "http://localhost:4000/api/leave-application-hr/" + props.data["_id"],
//         body,
//         {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         }
//       )
//       .then((res) => {
//         setTable(false);
//         setTable(true);
//       })
//       .catch((err) => {
//           
//       });
//   };

//   const handleAddLeaveApplicationHR = () => {
//       
//     setTable(false);
//   };

//   const handleEditLeaveApplicationHR = (e) => {
//       
//       
//     setEditForm(true);
//     setEditData(e);
//     // Assuming setEditFormGender is not used in the rest of your component
//     // setEditFormGender(e["Gender"]);
//   };

//   const handleFormClose = () => {
//       
//     setTable(true);
//   };

//   const handleEditFormClose = () => {
//       
//     setEditForm(false);
//   };

//   const handleLeaveApplicationHREditUpdate = (info, newInfo) => {
//     newInfo.preventDefault();
//       
//     let body = {
//       Status: newInfo.target[3].value
//     };

//     const taskId = uuid();
//     let leaveStatus = "";
//     if (body.Status === "2") {
//       leaveStatus = "Approved";
//     } else if (body.Status === "3") {
//       leaveStatus = "Rejected";
//     }
//     axios
//       .put(
//         "http://localhost:4000/api/leave-application-hr/" + info["_id"],
//         body,
//         {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         }
//       )
//       .then((res) => {
//         setTable(false);
//         setTable(true);
//           
//         if (empData.profile) {
//           const data = {
//             taskId,
//             employeeEmail: info.employee[0].Email,
//             hrEmail: info.hrEmail,
//             message: `Leave ${leaveStatus}`,
//             messageBy: name,
//             profile: empData.profile.image_url,
//             status: "unseen",
//             path: empData.Account === 1 ? "createLeave" : "leaveApplication"
//           };

//           socket.emit("leaveManagerStatusNotification", data);
//         } else {
//           const data = {
//             taskId,
//             employeeEmail: info.employee[0].Email,
//             hrEmail: info.hrEmail,
//             message: `Leave ${leaveStatus}`,
//             messageBy: name,
//             profile: null,
//             status: "unseen",
//             path: empData.Account === 1 ? "createLeave" : "leaveApplication"
//           };

//           socket.emit("leaveManagerStatusNotification", data);
//         }
//       })
//       .catch((err) => {
//           
//       });

//     setEditForm(false);
//   };

//   return (
//     <React.Fragment>
//       {table ? (
//         editForm ? (
//           <LeaveApplicationHRFormEdit
//             onLeaveApplicationHREditUpdate={handleLeaveApplicationHREditUpdate}
//             onFormEditClose={handleEditFormClose}
//             editData={editData}
//           // onFormClose={handleFormClose}
//           />
//         ) : (
//           <LeaveApplicationHRTable
//             onAddLeaveApplicationHR={handleAddLeaveApplicationHR}
//             onEditLeaveApplicationHR={handleEditLeaveApplicationHR}
//             data={props.data}
//           />
//         )
//       ) : (
//         <div></div>
//         // Uncomment the following code if needed
//         // <LeaveApplicationHRForm
//         //   onLeaveApplicationHRSubmit={handleLeaveApplicationHRSubmit}
//         //   onFormClose={handleFormClose}
//         //   onGenderChange={handleAddFormGenderChange}
//         // />
//       )}
//     </React.Fragment>
//   );
// };

// export default LeaveApplicationHR;
