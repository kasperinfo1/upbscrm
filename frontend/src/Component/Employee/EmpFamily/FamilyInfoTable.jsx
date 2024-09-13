import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FamilyInfoTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import BASE_URL from "../../../Pages/config/config";
import SearchLight from "../../../img/Attendance/SearchLight.svg";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
import OverLayToolTip from "../../../Utils/OverLayToolTip";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const FamilyInfoTable = (props) => {
  let id;
  if (props.data) {
    id = props.data["_id"];
  } else {
    id = localStorage.getItem("_id");
  }
  const [familyInfoData, setFamilyInfoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const { darkMode } = useTheme();

  const familyInfoObj = [];

  const loadFamilyInfoData = () => {
    axios
      .get(`${BASE_URL}/api/family-info/` + id, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        familyInfoObj.push(response.data);
          
        setFamilyInfoData(response.data);
        setLoading(false);
        const tempRowData = response.data.familyInfo.map((data) => ({
          data,
          Name: data["Name"],
          Relationship: data["Relationship"],
          DOB: data["DOB"].slice(0, 10),
          Occupation: data["Occupation"],
        }));
        setRowData(tempRowData);
      })
      .catch((error) => {
          
      });
  };

  const onFamilyInfoDelete = (e1, e2) => {
      
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(`${BASE_URL}/api/family-info/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          loadFamilyInfoData();
        })
        .catch((err) => {
            
        });
    }
  };

  useEffect(() => {
    loadFamilyInfoData();
  }, []);

  const renderButton = (params) => {
      
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onFamilyInfoDelete(props.data["_id"], params.data.data["_id"])
        }
      />
    );
  };

  const renderEditButton = (params) => {
      
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditFamilyInfo(params.data.data)}
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
      <div className="d-flex justify-content-between mb-2">
        <TittleHeader
          title={" Family Details"}
          numbers={rowData.length}
          message={"You can view family details here."}
        />

        <div className="py-1">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            onClick={props.onAddFamilyInfo}
          >
            <FaPlus />
            <span className="d-none d-md-flex">Add Member</span>
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
          <table className="table" style={{ fontSize: ".9rem" }}>
            <thead>
              <tr>
                <th style={rowHeadStyle}>Name</th>
                <th style={rowHeadStyle}>Relationship</th>
                <th style={rowHeadStyle}>DOB</th>
                <th style={rowHeadStyle}>Occupation</th>
                <th style={rowHeadStyle} className="text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((items, index) => (
                <tr key={index}>
                  <td style={rowBodyStyle} className="text-capitalize">
                    {items.Name}
                  </td>
                  <td style={rowBodyStyle} className="text-capitalize">
                    {items.Relationship}
                  </td>
                  <td style={rowBodyStyle} className="text-capitalize">
                    {items.DOB}
                  </td>
                  <td style={rowBodyStyle} className="text-capitalize">
                    {items.Occupation}
                  </td>
                  <td style={rowBodyStyle} className="text-capitalize text-end">
                    <OverLayToolTip
                      onClick={() => props.onEditFamilyInfo(items.data)}
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
              Member's details not available, please add member.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyInfoTable;
