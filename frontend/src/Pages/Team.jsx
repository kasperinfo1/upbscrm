import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import BASE_URL from "./config/config";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../Context/TheamContext/ThemeContext";
import { AttendanceContext } from '../Context/AttendanceContext/AttendanceContext';
import { rowBodyStyle, rowHeadStyle } from "../Style/TableStyle";
import Pagination from "../Utils/Pagination";
import TittleHeader from "./TittleHeader/TittleHeader";

const Table = () => {
  const {managerMail} = useContext(AttendanceContext)

  const email = localStorage.getItem("Email");
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const Account =(value)=>{
    switch(value){
      case 1:{
        return "Admin"
      }
      case 2:{
        return "Hr"
      } case 3:{
        return "Employee"
      } default :{
        return "Manager"
      }
    }

  }

  useEffect(() => {
    axios
      .post(
        `${BASE_URL}/api/employeeTeam`,
        { email:managerMail===null?email: managerMail },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEmployeeData(response.data);
          setLoading(false);
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate index of the last and first item for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeeData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Generate array of page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(employeeData.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div
      className="container-fluid "
      >
        <div className="mb-2"> 
        <TittleHeader title={'Employee List'} numbers={employeeData.length} message={`You can view all team member of List of : ( ${managerMail} )`}/>
        </div>
      {!loading ? (
        <>
         <div style={{
            // maxHeight: "68vh",
            overflow: "auto",
            position: "relative",
          }}
          className="table-responsive p-2 mb-3"> 
        <table className="table">
          <thead>
            <tr>
              <th style={rowHeadStyle(darkMode)}>Employee Name</th>
              <th style={rowHeadStyle(darkMode)}>ID</th>
              <th style={rowHeadStyle(darkMode)}>Position</th>
              <th style={rowHeadStyle(darkMode)}>Account</th>
              <th style={rowHeadStyle(darkMode)}>Status</th>
              <th style={rowHeadStyle(darkMode)}>Email</th>
              <th style={rowHeadStyle(darkMode)}>Contact No</th>
              <th style={rowHeadStyle(darkMode)}>Login Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee) => (
              <tr key={employee._id}>
                <td
                   style={rowBodyStyle(darkMode)}
                >
                  <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                      color: "white",
                      fontWeight: "bold",
                      overflow: "hidden",
                      marginRight: "10px",
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center'
                    }}
                  >
                    {employee?.data?.profile?.image_url ? (
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        src={employee?.data?.profile?.image_url}
                        alt=""
                      />
                    ) : (
                      <span className="d-flex align-items-center justify-content-center">
                        {employee?.FirstName?.charAt(0).toUpperCase() ?? ""}
                        {employee?.LastName?.charAt(0).toUpperCase() ?? ""}
                      </span>
                    )}
                  </div>
                  <span className="d-flex flex-column text-capitalize"> 
                    <span style={{fontSize:'.9rem'}}>{employee.empID}</span>
                    {`${employee.FirstName} ${employee.LastName}`}</span>
                  </div>
                </td>
                <td  style={rowBodyStyle(darkMode)}></td>
                <td  style={rowBodyStyle(darkMode)}>{employee.position[0].PositionName}</td>
                <td  style={rowBodyStyle(darkMode)}>{Account(employee.Account)}</td>
                <td  style={rowBodyStyle(darkMode)}
                  className={
                    employee.status === "active"
                      ? "text-success text-capitalize"
                      : "text-danger text-capitalize"
                  }
                >
                  {employee.status}
                </td>
                <td  style={rowBodyStyle(darkMode)}>{employee.Email}</td>
                <td  style={rowBodyStyle(darkMode)}>{employee.ContactNo}</td>
                <td  style={rowBodyStyle(darkMode)}>{employee.loginStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div><Pagination
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          handlePaginationPrev={handlePaginationPrev}
          handlePaginationNext={handlePaginationNext}
          setCurrentPage={setCurrentPage}
          filteredDataLength={employeeData.length}
          itemsPerPage={itemsPerPage}
        /></>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Table;
