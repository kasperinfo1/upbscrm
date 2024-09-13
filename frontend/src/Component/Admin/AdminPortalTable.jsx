import React, { useState, useEffect } from "react";
import "./AdminPortalTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import BASE_URL from "../../Pages/config/config";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import SearchLight from "../../img/Attendance/SearchLight.svg";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import TittleHeader from "../../Pages/TittleHeader/TittleHeader";
import Pagination from "../../Utils/Pagination";
import { rowBodyStyle, rowHeadStyle } from "../../Style/TableStyle";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminPortalTable = ({ onAddPortal, onEditPortal }) => {
  const { darkMode } = useTheme();
  const [portalData, setPortalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const loadPortalData = () => {
    axios
      .get(`${BASE_URL}/api/admin/portal`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const data = response.data.map((item) => ({
          ...item,
          Status: item.Status === 1 ? "enabled" : "disabled",
        }));
        setPortalData(data);
        setLoading(false);
      })
      .catch((error) => {
          
      });
  };

  const onPortalDelete = (id) => {
    if (
      window.confirm(
        "Are you sure to delete this record? It will delete all projects related to this portal."
      )
    ) {
      axios
        .delete(`${BASE_URL}/api/admin/portal/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadPortalData();
        })
        .catch((err) => {
            
        });
    }
  };

  useEffect(() => {
    loadPortalData();
  }, []);

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = portalData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(portalData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container-fluid py-2">
      <div className="d-flex justify-between align-items-start ">
        <TittleHeader
          title={"Portal Details"}
          numbers={portalData.length}
          message={"You can view all portals here."}
        />

        <button
          className="btn btn-primary d-flex align-items-center  gap-2 justify-content-center"
          variant="primary"
          id="add-button"
          onClick={onAddPortal}
        >
          <FaPlus />
          <span className="d-none d-md-flex">Add new Details</span>
        </button>
      </div>
      <div id="clear-both" />

      {!loading ? (
        <div
         
        >
          {" "}
          {portalData.length > 0 ? (
<>
<div style={{
                
                overflow: "auto",
                position: "relative",
              }}
              className="table-responsive p-2 mb-3">  
            <table
              className="table"
            
            >
              <thead>
                <tr>
                  <th style={rowHeadStyle(darkMode)}>S. No.</th>
                  <th style={rowHeadStyle(darkMode)}>Portal</th>
                  <th style={rowHeadStyle(darkMode)}>Status</th>
                  <th className="text-end" style={rowHeadStyle(darkMode)}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td style={rowBodyStyle(darkMode)}>{index + 1}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.PortalName}</td>
                    <td style={rowBodyStyle(darkMode)}>
                      <span
                        className={
                          item.Status === "enabled"
                            ? "border border-success px-1 rounded-5 text-capitalize"
                            : "border border-danger px-1 rounded-5 text-capitalize"
                        }
                      >
                        {" "}
                        {item.Status}
                      </span>
                    </td>
                    <td className="text-end" style={rowBodyStyle(darkMode)}>
                    <OverLayToolTip
                          style={{ color: darkMode ? "black" : "white" }}
                          icon={<FiEdit2 className="text-primary"/>}
                          onClick={() => onEditPortal(item)}
                          tooltip={"Edit Role"}
                        />
                        <OverLayToolTip
                          style={{ color: darkMode ? "black" : "white" }}
                          icon={<AiOutlineDelete className="fs-5 text-danger" />}
                          onClick={() => onPortalDelete(item._id)}
                          tooltip={"Delete Role"}
                        />
                    </td>
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
            filteredDataLength={portalData.length}
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
                  width: "20%",
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
                Portal not found. click on "+ add new details" to create new
                portal.
              </p>
            </div>
          )}
        </div>
      ) : (
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
    </div>
  );
};

export default AdminPortalTable;
