import React, { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";
import BASE_URL from "../../../Pages/config/config";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
import LeaveLight from "../../../img/Leave/LeaveLight.svg";
import OverLayToolTip from "../../../Utils/OverLayToolTip";
import Pagination from "../../../Utils/Pagination";
import LeaveDark from "../../../img/Leave/LeaveDark.svg";
import { rowBodyStyle, rowHeadStyle } from "../../../Style/TableStyle";


const LeaveApplicationHRTable = (props) => {
  const location = useLocation();
  const routeChecker = location.pathname.split("/")[1];
    
  const [leaveApplicationHRData, setLeaveApplicationHRData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { darkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const email = localStorage.getItem("Email");
  const formatDate = (dateString) => {
    if (!dateString) return;
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  const loadLeaveApplicationHRData = () => {
    axios
      .post(
        `${BASE_URL}/api/leave-application-hr/`,
        routeChecker === "hr" ? { hr: email } : { manager: email },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        const leaveApplicationHRObj = response.data;
          
        setLeaveApplicationHRData(leaveApplicationHRObj);
        setLoading(false);

        const rowDataT = leaveApplicationHRObj.map((data) => {
          return {
            data,
            empID: data?.empID,
            FirstName: data?.FirstName,
            LastName: data?.LastName,
            Name: data?.FirstName + " " + data?.LastName,
            Leavetype: data?.Leavetype,
            FromDate: formatDate(data["FromDate"]?.slice(0, 10)),
            ToDate: formatDate(data["ToDate"]?.slice(0, 10)),
            Days: calculateDays(data?.FromDate, data?.ToDate),
            Reasonforleave: data?.Reasonforleave,
            CreatedOn: formatDate(data?.createdOn?.slice(0, 10)),
            Status: status(data?.Status),
            updatedBy: data?.updatedBy,
            reasonOfRejection: data?.reasonOfRejection,
          };
        });
          
        setRowData(rowDataT.filter(data=> data.Status === "Approved" || data.Status === 2));
        setFilteredData(rowDataT.filter(data=> data.Status === "Approved" || data.Status === 2));
      })
      .catch((error) => {
          
      });
  };

  useEffect(() => {
    loadLeaveApplicationHRData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery]);

  const filterData = () => {
    const filtered = rowData.filter((item) => {
      return item.Name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const onLeaveApplicationHRDelete = (e1, e2) => {
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/leave-application-hr/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          loadLeaveApplicationHRData();
        })
        .catch((err) => {
            
        });
    }
  };

  const exportToPDF = () => {
    if (window.confirm("Are you sure to download Leave record? ")) {
      const pdfWidth = 297; // A4 width in mm
      const pdfHeight = 210; // A4 height in mm
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      doc.setFontSize(18);
      doc.text("Employee Leave Details", pdfWidth / 2, 15, "center");
      const headers = [
        "Emp Id",
        "Leave Type",
        "Start Date",
        "End Date",
        "Days",
        "Remarks",
        "Status",
      ];
      const data = filteredData.map((row) => [
        row.empID,
        row.Leavetype,
        row.FromDate,
        row.ToDate,
        row.Days,
        row.Reasonforleave,
        row.Status,

        "", // Action column - you can customize this based on your requirements
      ]);
      doc.setFontSize(12);
      doc.autoTable({
        head: [headers],
        body: data,
        startY: 25,
      });

      doc.save("leaveApplication_data.pdf");
    }
  };

  const status = (s) => {
    if (s == 1) {
      return "Pending";
    }
    if (s == 2) {
      return "Approved";
    }
    if (s == 3) {
      return "Rejected";
    }
  };

  const renderSortIcon = (field) => {
    if (sortColumn === field) {
      return sortDirection === "asc" ? "▴" : "▾";
    }
    return null;
  };

  const sortData = (columnName) => {
    let newSortDirection = "asc";

    if (sortColumn === columnName && sortDirection === "asc") {
      newSortDirection = "desc";
    }

    const sortedData = [...filteredData];

    sortedData.sort((a, b) => {
      const valueA = a[columnName];
      const valueB = b[columnName];

      let comparison = 0;

      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return sortDirection === "desc" ? comparison * -1 : comparison;
    });

    setFilteredData(sortedData);
    setSortColumn(columnName);
    setSortDirection(newSortDirection);
  };

  const approvedLeaves = filteredData.filter(
    (data) => data.Status === "Approved"
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
    <div className="d-flex flex-column justify-between m-0 mt-3">
      <div className="d-flex justify-content-between aline-items-center">
        <div className="my-auto">
          <h5
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)"
            }}
            className="m-0 p-0 "
          >
            Approved Leaves ( {filteredData.length} )
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)"
            }}
            className="m-0 p-0 "
          >
            You can see all approved leave requests here{" "}
          </p>
        </div>
        <div className="d-flex gap-2 justify-content-between py-3">
          <button
            className="btn btn-danger rounded-0 py-0 shadow-sm d-flex justify-center  aline-center gap-2"
            onClick={exportToPDF}
          >
            <BsFillFileEarmarkPdfFill className="fs-6" />
            <p className="my-auto d-none d-md-flex fs-6">PDF</p>
          </button>
          <div className="searchholder p-0 d-flex  position-relative">
            <input
              style={{
                height: "100%",
                width: "100%",
                paddingLeft: "15%"
              }}
              className="form-control border rounded-0"
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <LuSearch
              style={{ position: "absolute", top: "30%", left: "5%" }}
            />
          </div>
        </div>
      </div>
    </div>

    <div id="clear-both" />

    <div>
      <div
      >
        {currentItems.length > 0 ? (
<>
<div style={{
          // maxHeight: "68vh",
          overflow: "auto",
          position: "relative",
        }}
        className="table-responsive p-2 mb-3">  
<table className="table">
            <thead>
              <tr className="shadow">
                <th style={rowHeadStyle(darkMode)}>Profile</th>
                <th style={rowHeadStyle(darkMode)}>Employee Name</th>
                <th style={rowHeadStyle(darkMode)}>Emp ID</th>
                <th style={rowHeadStyle(darkMode)}>Leave Type</th>
                <th style={rowHeadStyle(darkMode)}>Start Date</th>
                <th style={rowHeadStyle(darkMode)}>End Date</th>
                <th style={rowHeadStyle(darkMode)}>CreatedOn</th>
                <th style={rowHeadStyle(darkMode)}>Days</th>
                <th style={rowHeadStyle(darkMode)}>Status</th>
                <th style={rowHeadStyle(darkMode)}>Remarks</th>
                <th style={rowHeadStyle(darkMode)}>Approver</th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .map((data, index) => {
                  return (
                    <tr key={index}>
                   
                    <td style={rowBodyStyle(darkMode)} className="text-capitalize px-0 py-1 border-0">
                    <div className="d-flex flex-nowrap gap-2">
                      <div
                        className="mx-auto d-flex align-items-center justify-content-center"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                          color: "white",
                          fontWeight: "bold",
                          overflow: "hidden",
                          objectFit: "cover",
                        }}
                      >
                        {data?.data?.profile?.image_url ? (
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            src={data?.data?.profile?.image_url}
                            alt=""
                          />
                        ) : (
                          <span>
                            {data?.Name?.split(" ")
                              .map((name) => name[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                      <td style={rowBodyStyle(darkMode)}>{data.Name}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.empID}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.Leavetype}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.FromDate}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.ToDate}</td>
                      <td style={rowBodyStyle(darkMode)}>
                        <span>{data.CreatedOn}</span>
                      </td>
                      <td style={rowBodyStyle(darkMode)}>
                        <span>{data.Days}</span>
                      </td>
                      <td style={rowBodyStyle(darkMode)}>
                        <span className=" text-success border border-success px-2 py-0 rounded-5">
                          {data.Status}
                        </span>
                      </td>
                      <td style={rowBodyStyle(darkMode)}>{data.Reasonforleave}</td>
                      <td style={rowBodyStyle(darkMode)}>
                      {data.data.updatedBy}
                      </td>
                    </tr>
                  );
                })}
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
        /></>
        ) : (
          <div
            style={{
              height: "80vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              wordSpacing: "5px",
              flexDirection: "column",
              gap: "2rem"
            }}
          >
            <img
              style={{
                height: "auto",
                width: "25%"
              }}
              src={darkMode ? LeaveDark : LeaveLight}
              alt="img"
            />
            <p
              style={{
                color: darkMode
                  ? "var(--secondaryDashColorDark)"
                  : "var( --primaryDashMenuColor)"
              }}
            >
              No Leave requests found.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default LeaveApplicationHRTable;
