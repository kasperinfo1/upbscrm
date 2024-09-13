import React, { useState, useEffect, useCallback } from "react";
import "./StateTable.css";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../config/config";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import Pagination from "../../Utils/Pagination";
import { rowBodyStyle, rowHeadStyle } from "../../Style/TableStyle";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const StateTable = (props) => {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [itemsPerPage] = useState(5); // State for the number of items per page
  const { darkMode } = useTheme();

  const loadStateData = useCallback(() => {
    axios
      .get(`${BASE_URL}/api/state`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const stateObj = response.data;
        setStateData(stateObj);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadStateData();
  }, [loadStateData]);

  const onStateDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/state/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadStateData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 403) {
            window.alert(err.response.data);
          } else {
            window.alert("An error occurred while deleting the record.");
          }
        });
    }
  };

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stateData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(stateData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="container-fluid py-2">
      <div className="d-flex justify-between align-items-start mb-3">
        <div className="my-auto">
          <h5
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
              fontWeight: "600",
            }}
            className="m-0"
          >
            State Details ({stateData.length})
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
            className="m-0"
          >
            You can see all states list here.
          </p>
        </div>
        <button
          className="btn btn-primary gap-1 d-flex my-auto align-items-center justify-content-center"
          onClick={props.onAddState}
        >
          <AiOutlinePlusCircle className="fs-4" />
          <span className="d-none d-md-flex"> Add State</span>
        </button>
      </div>

      <div id="clear-both"></div>

      {!loading ? (
        <div
          style={{
            color: darkMode
              ? "var(--secondaryDashColorDark)"
              : "var(--secondaryDashMenuColor)",
            overflow: "auto",
            maxHeight: "80vh",
            position: "relative",
          }}
        >
            <div style={{
          // maxHeight: "68vh",
          overflow: "auto",
          position: "relative",
        }}
        className="table-responsive p-2 mb-3">  
          <table className="table" style={{ fontSize: ".9rem" }}>
            <thead>
              <tr style={{ position: "sticky", top: "0" }}>
                <th style={rowHeadStyle(darkMode)}>Country</th>
                <th style={rowHeadStyle(darkMode)}>State</th>
                <th className="text-end" style={rowHeadStyle(darkMode)}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((items, index) => (
                <tr key={index}>
                  <td style={rowBodyStyle(darkMode)} className="text-uppercase">
                    {items.country[0].CountryName}
                  </td>
                  <td style={rowBodyStyle(darkMode)} className="text-uppercase">
                    {items.StateName}
                  </td>
                  <td className="text-end" style={rowBodyStyle(darkMode)}>
                    <OverLayToolTip
                      style={{ color: darkMode ? "black" : "white" }}
                      icon={<FiEdit2 className="text-primary" />}
                      onClick={() => props.onEditState(items)}
                      tooltip={"Edit State"}
                    />
                    <OverLayToolTip
                      style={{ color: darkMode ? "black" : "white" }}
                      icon={<AiOutlineDelete className="fs-5 text-danger" />}
                      onClick={() => onStateDelete(items._id)}
                      tooltip={"Delete State"}
                    />
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
            filteredDataLength={stateData.length}
            itemsPerPage={itemsPerPage}
          />
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

export default StateTable;
