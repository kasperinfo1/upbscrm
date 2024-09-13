import React, { useState, useEffect } from "react";
import "./EmployeeTable.css";
import { LuSearch } from "react-icons/lu";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilePdf, FaFilter } from "react-icons/fa";
import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import BASE_URL from "../config/config";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import Pagination from "../../Utils/Pagination";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import { RiUserAddLine } from "react-icons/ri";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { rowBodyStyle, rowHeadStyle } from "../../Style/TableStyle";
import { CgProfile } from "react-icons/cg";



const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminEmployeeTable = (props) => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const [, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isIdFilterActive, ] = useState(false);
  const [isIdSortAscending, setIsIdSortAscending] = useState(true);
  const [, setUpcomingBirthdays] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [activeProfile, setActiveProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { darkMode } = useTheme();

  const isFilterApplied = selectedFilter !== "";

  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/employee`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEmployeeData(response.data);
          setLoading(false);
          setRowData([]);

          response.data.forEach((data) => {
            if (route === "hr" && data["Account"] === 1) return;

            let temp = {
              data,
              Email: data["Email"],
              Password: data["Password"],
              Account:
                data["Account"] === 1
                  ? "Admin"
                  : data["Account"] === 2
                  ? "HR"
                  : data["Account"] === 3
                  ? "Employee"
                  : data["Account"] === 4
                  ? "Manager"
                  : "",
              RoleName: data["role"][0] ? data["role"][0]["RoleName"] : "",
              FirstName: data["FirstName"],
              MiddleName: data["MiddleName"],
              LastName: data["LastName"],
              DOB: data["DOB"].slice(0, 10),
              ContactNo: data["ContactNo"],
              empID: data["empID"],
              DepartmentName: data["department"][0]
                ? data["department"][0]["DepartmentName"]
                : "",
              PositionName: data["position"][0]
                ? data["position"][0]["PositionName"]
                : "",
              DateOfJoining: data["DateOfJoining"].slice(0, 10),
              status: data["status"],
              loginStatus: data["loginStatus"],
            };

            setRowData((prevData) => [...prevData, temp]);
          });
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
          
      });
  };

  const onEmployeeDelete = (e) => {
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/employee/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadEmployeeData();
        })
        .catch((err) => {
            
        });
    }
  };

  const exportToPDF = () => {
    window.confirm("Are you sure to download Employee record? ");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210],
    });

    doc.setFontSize(18);
    doc.text("Employee Details", 297 / 2, 15, "center");
    const headers = [
      "Emp Id",
      "Email",
      "Account Access",
      "First Name",
      "Last Name",
      "DOB",
      "ContactNo",
      "Role",
      "Position",
      "Department",
      "D.O.J",
    ];
    const data = rowData.map((row) => [
      row.empID,
      row.Email,
      row.Account,
      row.FirstName,
      row.LastName,
      row.DOB,
      row.ContactNo,
      row.RoleName,
      row.PositionName,
      row.DepartmentName,
      row.DateOfJoining,
      row.status,
      "",
    ]);
    doc.setFontSize(12);
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 25,
    });

    doc.save("employee_data.pdf ");
  };

  const renderInfoButton = (params) => {
    if (params.data && params.data.data) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faInfoCircle}
            onClick={() => props.onEmpInfo(params.data.data)}
          />
        </div>
      );
    }
    return null;
  };

  const renderButton = (params) => {
    if (params.data && params.data.data && params.data.data["_id"]) {
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onEmployeeDelete(params.data.data["_id"])}
        />
      );
    }
    return null;
  };

  const renderEditButton = (params) => {
    if (params.data && params.data.data) {
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => props.onEditEmployee(params.data.data)}
        />
      );
    }
    return null;
  };

  const getBackgroundColor = (accountType) => {
    switch (accountType) {
      case "Admin":
        return "#1D267D";
      case "HR":
        return "#1D267D";
      case "Employee":
        return "#1D267D";
      case "Manager":
        return "#1D267D";
      default:
        return "#1D267D";
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleToggleIdSort = () => {
    setIsIdSortAscending(!isIdSortAscending);
  };

  const sortById = (a, b) => {
    const idA = a.empID.toLowerCase();
    const idB = b.empID.toLowerCase();

    if (isIdSortAscending) {
      return idA.localeCompare(idB);
    } else {
      return idB.localeCompare(idA);
    }
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const calculateUpcomingBirthdays = () => {
    const today = new Date();
    const upcomingBirthdaysData = rowData.filter((employee) => {
      const dob = new Date(employee.DOB);
      dob.setFullYear(today.getFullYear());

      const timeDiff = dob - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff >= 0 && daysDiff <= 7;
    });

    setUpcomingBirthdays(upcomingBirthdaysData);
  };

  useEffect(() => {
    calculateUpcomingBirthdays();
  }, [rowData]);

  let filteredData = rowData.filter((item) => {
    const isMatchingId = isIdFilterActive
      ? item.empID.toLowerCase() === searchInput.toLowerCase()
      : true;

    const isMatchingFirstName = item.FirstName.toLowerCase().includes(
      searchInput.toLowerCase()
    );

    const isMatchingFilter =
      selectedFilter === "" || item.Account === selectedFilter;

    return isMatchingId && isMatchingFirstName && isMatchingFilter;
  });

  filteredData = filteredData.sort(sortById);

  const allCount = rowData.filter((data) => data.Account === "").length;
  const adminCount = rowData.filter((data) => data.Account === "Admin").length;
  const hrCount = rowData.filter((data) => data.Account === "HR").length;
  const managerCount = rowData.filter(
    (data) => data.Account === "Manager"
  ).length;
  const employeeCount = rowData.filter(
    (data) => data.Account === "Employee"
  ).length;

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

 
  return (
    <div className="container-fluid">
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "3",
        background: darkMode
          ? "var(--primaryDashMenuColor)"
          : "var(--primaryDashColorDark)",
        color: darkMode
          ? "var(--primaryDashColorDark)"
          : "var(--secondaryDashMenuColor)",
      }}
      className="my-auto py-2 mx-0"
    >
      <div className="row m-auto row-gap-4 px-0">
        <div className="col-12 col-sm-12 col-md-3 d-flex px-1 px-md-2">
          <h5 style={{fontSize:'1.1rem'}} className="d-flex  my-auto align-items-center gap-3">Employees List <span>({filteredData.length})</span></h5>

        </div>
        <div className="col-6 col-md-5 d-flex p-0 px-1 position-relative">
          <input
            style={{
              height: "100%",
              width: "100%",
              paddingLeft: "30px",
            }}
            className="form-control rounded-0 border border-muted border rounded-0 rounded-sm-5"
            type="text"
            placeholder="Search by name"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <LuSearch
            style={{
              position: "absolute",
              top: "25%",
              left: "9px",
              height: "1.2rem",
              width: "1.2rem",
              color: "black",
            }}
          />
        </div>
        <div className="col-6 col-md-4 d-flex align-items-center justify-content-end gap-2">
          <button
            onClick={exportToPDF}
            className="btn  bg-white shadow-sm fw-bold rounded-0"
          >
            <FaFilePdf className="fs-6 align-items-center text-danger" />
          </button>
          <div className="bg-white" style={{ position: "relative" }}>
            <span
              onMouseEnter={() => setActiveProfile("name")}
              onMouseLeave={() => setActiveProfile(null)}
              className={`btn rounded-0 shadow-sm ${
                isFilterApplied ? "bg-primary text-white" : "text-primary"
              }`}
            >
              <FaFilter />
              <div
                style={{
                  position: "absolute",
                  zIndex: "1",
                  right: "0",
                  top: "95%",
                  width: "150px",
                  display: activeProfile === "name" ? "flex" : "none",
                  backgroundColor: "rgba(256,256,256,.95)",
                }}
                className="px-2 shadow flex-column py-2 shadow rounded-1 text-dark border"
              >
                <div
                  onClick={() => setSelectedFilter("")}
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-nowrap justify-content-between"
                >
                  All <span>{rowData.length}</span>
                </div>
                <div
                  onClick={() => setSelectedFilter("Admin")}
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-nowrap justify-content-between"
                >
                  Admin <span>{adminCount}</span>
                </div>
                <div
                  onClick={() => setSelectedFilter("HR")}
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-nowrap justify-content-between"
                >
                  HR <span>{hrCount}</span>
                </div>
                <div
                  onClick={() => setSelectedFilter("Manager")}
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-nowrap justify-content-between"
                >
                  Manager <span>{managerCount}</span>
                </div>
                <div
                  onClick={() => setSelectedFilter("Employee")}
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-nowrap justify-content-between"
                >
                  Employee <span>{employeeCount}</span>
                </div>
                {isFilterApplied && (
                  <div
                    onClick={() => setSelectedFilter("")}
                    style={{ cursor: "pointer" }}
                    className="d-flex btn btn-primary my-1 text-center py-1 rounded-0 shadow-sm flex-nowrap justify-content-center"
                  >
                    Clear Filter
                  </div>
                )}
              </div>
            </span>
          </div>
          <button
            onClick={handleToggleIdSort}
            className="btn  bg-white shadow-sm fs-6 fw-bold rounded-0"
          >
            {isIdSortAscending ? (
              <FcNumericalSorting21 />
            ) : (
              <FcNumericalSorting12 />
            )}
          </button>
          <button
            className="d-flex  btn justify-center bg-success shadow-sm rounded-0 text-white align-center gap-2"
            onClick={props.onAddEmployee}
          >
            + <span className="d-none d-lg-flex">Add Employee</span>
          </button>
        </div>
      </div>
    </div>
    <div id="clear-both" />
    {!loading ? (
      <div>
        <div
          style={{
            maxHeight: "68vh",
            overflow: "auto",
            position: "relative",
          }}
          className="table-responsive p-2 mb-3"
        >
          <table
            className="table"
            style={{
              fontSize: ".9rem",
              minHeight: "20vh",
              maxHeight: "20vh",
              overflow: "auto",
            }}
          >
            <thead>
              <tr>
                <th colSpan={2} style={rowHeadStyle(darkMode)}>
                  Employee Name
                </th>
                <th style={rowHeadStyle(darkMode)}>ID</th>
                <th style={rowHeadStyle(darkMode)}>Position</th>
                <th style={rowHeadStyle(darkMode)}>Account</th>
                <th style={rowHeadStyle(darkMode)}>Status</th>
                <th style={rowHeadStyle(darkMode)}>Email</th>
                <th style={rowHeadStyle(darkMode)}>Contact No</th>
                <th style={rowHeadStyle(darkMode)}>Login Status</th>
                <th style={rowHeadStyle(darkMode)} className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((items, index) => (
                <tr key={index}>
                  <td
                    className="border-0"
                    style={rowBodyStyle(darkMode)}
                  >
                    <div
                      className="mx-auto d-flex align-items-center justify-content-center"
                      style={{height: "30px",
                        width: "30px",}}
                    >
                      {items?.data?.profile?.image_url ? (
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          className="border-0"
                          src={items?.data?.profile?.image_url}
                          alt=""
                        />
                      ) : (
                        <span>
                          {items?.FirstName?.charAt(0).toUpperCase() ?? ""}
                          {items?.LastName?.charAt(0).toUpperCase() ?? ""}
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                     style={rowBodyStyle(darkMode)}
                    className="border-0"
                  >
                    {items.FirstName} {items.LastName}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    {items.empID}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    {items.PositionName}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    {items.Account}
                  </td>
                  <td
                      style={rowBodyStyle(darkMode)}
                    className={
                      items.status === "active"
                        ? "text-success border-0 text-capitalize"
                        : "text-danger border-0 text-capitalize"
                    }
                  >
                    {items.status}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    {items.Email}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    {items.ContactNo}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    {items.status === "Inactive" ? "Inactive" : items.loginStatus}
                  </td>
                  <td
                    className="border-0"
                     style={rowBodyStyle(darkMode)}
                  >
                    <div style={{width:'fit-content', }} className="d-flex w-100 justify-content-end  gap-2 align-items-center"><OverLayToolTip
                      style={{ color: darkMode ? "black" : "white" }}
                      icon={<CgProfile className="fs-5" />}
                      onClick={() => props.onEmpInfo(items.data)}
                      tooltip={"Info Profile"}
                    />
                    <OverLayToolTip
                      style={{ color: darkMode ? "black" : "white" }}
                      icon={<RiUserAddLine className="fs-5" />}
                      onClick={() => props.onEditEmployee(items.data)}
                      tooltip={"Edit Profile"}
                    /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          handlePaginationPrev={handlePaginationPrev}
          handlePaginationNext={handlePaginationNext}
          setCurrentPage={setCurrentPage}
          filteredDataLength={filteredData.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    ) : (
      <div id="loading-bar">
        <RingLoader
          sizeUnit={"px"}
          size={50}
          color={"#0000ff"}
          loading={true}
        />
      </div>
    )}
  </div>
  );
};

export default AdminEmployeeTable;
