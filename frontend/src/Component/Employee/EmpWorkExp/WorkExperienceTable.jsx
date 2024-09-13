import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import "./WorkExperienceTable.css";
import SearchLight from "../../../img/Attendance/SearchLight.svg";
import BASE_URL from "../../../Pages/config/config.js";
import { useTheme } from "../../../Context/TheamContext/ThemeContext.js";
import OverLayToolTip from "../../../Utils/OverLayToolTip.jsx";
import TittleHeader from "../../../Pages/TittleHeader/TittleHeader.jsx";
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const WorkExperienceTable = (props) => {
  const [workExperienceData, setWorkExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const { darkMode } = useTheme();
  let id;
  if (props.data) {
    id = props.data["_id"];
  } else {
    id = localStorage.getItem("_id");
  }
  // Removed const from here
  let workExperienceObj = [];
  let rowDataT = [];

  const loadWorkExperienceData = () => {
    axios
      .get(`${BASE_URL}/api/work-experience/` + id, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        workExperienceObj = response.data;
          
        setWorkExperienceData(response.data);
        setLoading(false);
        rowDataT.length = 0;
        workExperienceObj.workExperience.map((data) => {
          let temp = {
            data,
            CompanyName: data["CompanyName"],
            Designation: data["Designation"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
          };

          rowDataT.push(temp);
        });
        setRowData(rowDataT);
      })
      .catch((error) => {
          
      });
  };

  const onWorkExperienceDelete = (e1, e2) => {
      
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(`${BASE_URL}/api/work-experience/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          loadWorkExperienceData();
        })
        .catch((err) => {
            
        });
    }
  };

  useEffect(() => {
    loadWorkExperienceData();
  }, []);

  // Corrected function declaration
  const renderButton = (params) => {
      
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onWorkExperienceDelete(props.data["_id"], params.data.data["_id"])
        }
      />
    );
  };

  // Corrected function declaration
  const renderEditButton = (params) => {
      
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditWorkExperience(params.data.data)}
      />
    );
  };

  const rowHeadStyle = {
    verticalAlign: "middle",
    whiteSpace: "pre",
    background: darkMode
      ? "var(--primaryDashMenuColor)"
      : "var(--primaryDashColorDark)",
    color: darkMode
      ? "var(--primaryDashColorDark)"
      : "var(--secondaryDashMenuColor)",
    border: "none",
    position: "sticky",
    top: "0rem",
    zIndex: "100",
  };

  const rowBodyStyle = {
    verticalAlign: "middle",
    whiteSpace: "pre",
    background: darkMode
      ? "var(--secondaryDashMenuColor)"
      : "var(--secondaryDashColorDark)",
    color: darkMode
      ? "var(--secondaryDashColorDark)"
      : "var(--primaryDashMenuColor)",
    border: "none",
  };

  return (
    <div className="container-fluid">
      <div id="table-outer-div-scroll">
        <div className="d-flex justify-content-between my-2">
          <TittleHeader
            title={"Work Experience"}
            numbers={rowData.length}
            message={"You can view work experience details here."}
          />

          <div className="py-1">
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
              onClick={props.onAddWorkExperience}
            >
              <FaPlus />
              <span className="d-none d-md-flex">Add Experience</span>
            </button>
          </div>
        </div>

        <div id="clear-both" />

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
        <div>
          {rowData.length > 0 ? (
              <div style={{
                // maxHeight: "68vh",
                overflow: "auto",
                position: "relative",
              }}
              className="table-responsive p-2 mb-3">  
            <table className="table">
              <thead>
                <tr>
                  <th style={rowHeadStyle}>Company Name</th>
                  <th style={rowHeadStyle}>Designation</th>
                  <th style={rowHeadStyle}>FromDate</th>
                  <th style={rowHeadStyle}>ToDate</th>
                  <th style={rowHeadStyle} className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowData.map((items, index) => (
                  <tr key={index}>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {items.CompanyName}
                    </td>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {items.Designation}
                    </td>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {items.FromDate}
                    </td>
                    <td style={rowBodyStyle} className="text-capitalize">
                      {items.ToDate}
                    </td>
                    <td
                      style={rowBodyStyle}
                      className="text-capitalize text-end"
                    >
                      <OverLayToolTip
                        onClick={() => props.onEditWorkExperience(items.data)}
                        tooltip={"Edit"}
                        icon={<FaRegEdit className="text-primary fs-5" />}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div
              style={{
                height: "65vh",
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
                  width: "30%",
                }}
                src={SearchLight}
                alt="img"
              />
              <p
                className="text-center w-75 mx-auto"
                style={{
                  color: darkMode
                    ? "var(--secondaryDashColorDark)"
                    : "var( --primaryDashMenuColor)",
                }}
              >
                Details not available Please add.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceTable;
