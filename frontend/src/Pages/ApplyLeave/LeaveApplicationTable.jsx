import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button, Table } from "react-bootstrap";
import BASE_URL from "../config/config";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import LeaveDark from "../../img/Leave/LeaveDark.svg";
import LeaveLight from "../../img/Leave/LeaveLight.svg";
import LeaveBalance from "../../Component/HrManager/LeaveStatus/LeaveBalance";
import TittleHeader from "../TittleHeader/TittleHeader";
import { rowBodyStyle, rowHeadStyle } from "../../Style/TableStyle";
import Pagination from "../../Utils/Pagination";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const LeaveApplicationEmpTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { darkMode } = useTheme();

  const loadLeaveApplicationEmpData = () => {
    axios
      .get(
        `${BASE_URL}/api/leave-application-man/` + localStorage.getItem("_id"),
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        const leaveApplicationEmpObj = response.data;
        setLoading(false);

        const newRowsData = leaveApplicationEmpObj.leaveApplication.map(
          (data) => {
            return {
              data,
              Leavetype: data["Leavetype"],
              FromDate: data["FromDate"].slice(0, 10),
              ToDate: data["ToDate"].slice(0, 10),
              Reasonforleave: data["Reasonforleave"],
              Status: data["Status"],
              updatedBy: data["updatedBy"],
              reasonOfRejection: data["reasonOfRejection"],
            };
          }
        );
        console.log(newRowsData);
        setRowData(newRowsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const onLeaveApplicationEmpDelete = (e1, e2) => {
  //   console.log(e1, e2);
  //   if (window.confirm("Are you sure to delete this record? ")) {
  //     axios
  //       .delete(`${BASE_URL}/api/leave-application-emp/${e1}/${e2}`, {
  //         headers: {
  //           authorization: localStorage.getItem("token") || "",
  //         },
  //       })
  //       .then((res) => {
  //         loadLeaveApplicationEmpData();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const status = (s) => {
    console.log(s === 3);
    if (s === "1") {
      return "Pending";
    }
    if (s === "2") {
      return "Approved";
    }
    if (s === "3") {
      return "Rejected";
    }
    return "Unknown Status";
  };

  const onEdit = (data) => {
    if (data["Status"] === 1) {
      props.onEditLeaveApplicationEmp(data);
    } else {
      window.alert(
        "You cannot edit the application after it's approved or rejected"
      );
    }
  };

  useEffect(() => {
    loadLeaveApplicationEmpData();
  }, []);

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rowData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{maxHeight:'82vh', overflow:'auto'}} className="container-fluid py-2 pb-5">
      {/* <LeaveBalance /> */}
      <div className="container-fluid">
        <div className="d-flex justify-content-between py-2">
          <TittleHeader
            title={"Your Leave Application"}
            numbers={rowData.length}
            message={"You can view your applied leaves here."}
          />
          <div className="my-auto">
            <h5
              style={{
                color: darkMode
                  ? "var(--secondaryDashColorDark)"
                  : "var(--secondaryDashMenuColor)",
                fontWeight: "600",
              }}
              className=" m-0"
            >
              {/* ( {} ) */}
            </h5>
            <p
              style={{
                color: darkMode
                  ? "var(--secondaryDashColorDark)"
                  : "var(--secondaryDashMenuColor)",
              }}
              className=" m-0"
            ></p>
          </div>
          <Button
            variant="primary"
            id="add-button"
            onClick={props.onAddLeaveApplicationEmp}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Apply Leave
          </Button>
        </div>

        {loading && (
          <div id="loading-bar">
            <RingLoader
              css={override}
              sizeUnit={"px"}
              size={50}
              color={"#0000ff"}
              loading={true}
            />
          </div>
        )}
        <div id="clear-both" />
        <div
        >
          {rowData.length > 0 ? (
<>
<div style={{
          // maxHeight: "68vh",
          overflow: "auto",
          position: "relative",
        }}
        className="table-responsive p-2 mb-3">  
<Table className="table">
              <thead>
                <tr>
                  <th style={rowHeadStyle(darkMode)}>Leave Type</th>
                  <th style={rowHeadStyle(darkMode)}>Start Date</th>
                  <th style={rowHeadStyle(darkMode)}>End Date</th>
                  <th style={rowHeadStyle(darkMode)}>Remarks</th>
                  <th style={rowHeadStyle(darkMode)}>Status</th>
                  <th style={rowHeadStyle(darkMode)}>Update By</th>
                  <th className="text-end" style={rowHeadStyle(darkMode)}>
                    Reason for Rejection
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td style={rowBodyStyle(darkMode)}>{data.Leavetype}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.FromDate}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.ToDate}</td>
                      <td style={rowBodyStyle(darkMode)}>{data.Reasonforleave}</td>
                      <td style={rowBodyStyle(darkMode)}>{status(data.Status)}</td>
                      <td style={rowBodyStyle(darkMode)}>
                        {data.updatedBy ? (
                          data.updatedBy
                        ) : (
                          <span
                            className="border border-danger rounded-5 px-2"
                            style={{ opacity: "50%", fontSize: ".9rem" }}
                          >
                            Not Updated
                          </span>
                        )}
                      </td>
                      <td className="text-end" style={rowBodyStyle(darkMode)}>
                        {data.reasonOfRejection ? (
                          data.reasonOfRejection
                        ) : (
                          <span
                            className="border border-danger rounded-5 px-2"
                            style={{ opacity: "50%", fontSize: ".9rem" }}
                          >
                            Not Updated
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            </div>
            <Pagination
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            handlePaginationPrev={handlePaginationPrev}
            handlePaginationNext={handlePaginationNext}
            setCurrentPage={setCurrentPage}
            filteredDataLength={rowData.length}
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
                gap: "2rem",
              }}
            >
              <img
                style={{
                  height: "auto",
                  width: "25%",
                }}
                src={darkMode ? LeaveDark : LeaveLight}
                alt="img"
              />
              <p
                style={{
                  color: darkMode
                    ? "var(--secondaryDashColorDark)"
                    : "var( --primaryDashMenuColor)",
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

export default LeaveApplicationEmpTable;
