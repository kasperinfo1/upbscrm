import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import "./SalaryTable.css";
import { LuSearch } from "react-icons/lu";
import {  MdOutlineCurrencyRupee } from "react-icons/md";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../config/config";
import TittleHeader from "../TittleHeader/TittleHeader";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import Pagination from "../../Utils/Pagination";
import { rowBodyStyle, rowHeadStyle } from "../../Style/TableStyle";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminSalaryTable = (props) => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { darkMode } = useTheme();

  // const loadSalaryData = () => {
  //   axios
  //     .get(`${BASE_URL}/api/salary`, {
  //       headers: {
  //         authorization: localStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((response) => {
  //       const salaryObj = response.data;
  //       console.log("response", response.data);
  //       setSalaryData(response.data);
  //       setLoading(false);

  //       const rowDataT = salaryObj.map((data) => ({
  //         data,
  //         empID: data["empID"],
  //         EmployeeName: `${data["FirstName"]} ${data["LastName"]}`,
  //         PositionName: data["position"][0]["PositionName"],
  //         BasicSalary: data["salary"][0]["BasicSalary"],
  //         BankName: data["salary"][0]["BankName"],
  //         AccountNo: data["salary"][0]["AccountNo"],
  //         AccountHolderName: data["salary"][0]["AccountHolderName"],
  //         IFSCcode: data["salary"][0]["IFSCcode"],
  //         TaxDeduction: data["salary"][0]["TaxDeduction"],
  //       }));

  //       setSalaryData(rowDataT);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const loadSalaryData = () => {
    axios
      .get(`${BASE_URL}/api/salary`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const salaryObj = response.data;
        console.log("response", response.data);
        setSalaryData(response.data);
        setLoading(false);

        const rowDataT = salaryObj.map((data) => ({
          data,
          empID: data["empID"],
          profile: data["profile"],
          EmployeeName: `${data["FirstName"]} ${data["LastName"]}`,
          PositionName: data["position"][0]["PositionName"],
          // Email: data["email"][0]["Email"],
          BasicSalary: data["salary"][0]["BasicSalary"],
          BankName: data["salary"][0]["BankName"],
          AccountNo: data["salary"][0]["AccountNo"],
          AccountHolderName: data["salary"][0]["AccountHolderName"],
          IFSCcode: data["salary"][0]["IFSCcode"],
          TaxDeduction: data["salary"][0]["TaxDeduction"],
          HRASalary: data["salary"][0]["HRASalary"],
          PFDeduct: data["salary"][0]["PFDeduct"],
          LeaveDeduct: data["salary"][0]["LeaveDeduct"],
          MAllowance: data["salary"][0]["MAllowance"],
          SpecialAllowance: data["salary"][0]["SpecialAllowance"],
          otherAllowance: data["salary"][0]["otherAllowance"],
          totalSalary: data["salary"][0]["totalSalary"],
        }));

        setSalaryData(rowDataT);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSalaryDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/salary/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          loadSalaryData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadSalaryData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedAndFilteredData = salaryData
    .slice()
    .filter((item) =>
      item.EmployeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate index of the last and first item for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Generate array of page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedAndFilteredData.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

 
  console.log(currentItems);

  return (
    <div>
      <div
        style={{
          background: darkMode
            ? "var(--secondaryDashMenuColor)"
            : "var(--secondaryDashColorDark)",
          color: darkMode
            ? "var(--secondaryDashColorDark)"
            : "var(--primaryDashMenuColor)",
        }}
        className="row mx-auto mb-3 py-1 mt-2"
      >
        <div className="my-auto d-flex justify-content-between">
          <TittleHeader
            title={"Salary Details"}
            message={"You can view or create employees salary here."}
          />
          <div className="d-flex gap-2 justify-content-between py-1">
            <div className="searchholder d-none d-md-flex p-0 d-flex my-auto position-relative">
              <input
                style={{
                  height: "100%",
                  width: "100%",
                  paddingLeft: "15%",
                }}
                className="form-control border border-primary border-2"
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <LuSearch
                className="text-black"
                style={{ position: "absolute", top: "30%", left: "5%" }}
              />
            </div>
            <Button
              className="my-auto d-flex gap-1 my-auto"
              id="add-button"
              onClick={props.onAddSalary}
            >
              + <span className="d-none d-sm-block">Add Salary</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="searchholder d-block d-md-none container-fluid my-2 d-flex position-relative">
        <input
          style={{
            height: "100%",
            width: "100%",
            paddingLeft: "15%",
          }}
          className="form-control"
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <LuSearch
          className="text-black"
          style={{ position: "absolute", top: "30%", left: "5%" }}
        />
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
      <div className="row m-auto container-fluid">
        {currentItems.length > 0 ? (
          <>
          <div style={{
            // maxHeight: "68vh",
            overflow: "auto",
            position: "relative",
          }}
          className="table-responsive p-2 mb-3">            
          <table className="table" style={{ fontSize: ".9rem" }}>
          <thead>
            <tr style={{ position: "sticky", top: "0", zIndex: "3" }}>
              <th colSpan={2} style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                Employee Name
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                # ID
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                Designation
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                <MdOutlineCurrencyRupee /> Salary
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                Bank Name
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                Account No
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                IFSC Code
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal border-0">
                <MdOutlineCurrencyRupee /> Tax Deduction
              </th>
              <th style={rowHeadStyle(darkMode)} className="py-2 fw-normal text-end border-0">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr className="stickey-top" key={index}>
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
                      {item?.data?.profile?.image_url ? (
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={item?.data?.profile?.image_url}
                          alt=""
                        />
                      ) : (
                        <span>
                          {item?.EmployeeName?.split(" ")
                            .map((name) => name[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td style={rowBodyStyle(darkMode)} className="border-0">
                  {item.EmployeeName}
                </td>
                <td style={rowBodyStyle(darkMode)} className="border-0">
                  {item.empID}
                </td>
                <td style={rowBodyStyle(darkMode)} className="border-0">
                  {item.PositionName}
                </td>
                <td style={rowBodyStyle(darkMode)} className="border-0">
                  <MdOutlineCurrencyRupee /> {item.totalSalary}/-
                </td>
                <td style={rowBodyStyle(darkMode)} className="text-uppercase border-0">
                  {item.BankName}
                </td>
                <td style={rowBodyStyle(darkMode)} className="text-uppercase border-0">
                  {item.AccountNo}
                </td>
                <td style={rowBodyStyle(darkMode)} className="text-uppercase border-0">
                  {item.IFSCcode}
                </td>
                <td style={rowBodyStyle(darkMode)} className="border-0">
                  <MdOutlineCurrencyRupee /> {item.TaxDeduction}/-
                </td>
                <td style={rowBodyStyle(darkMode)} className="border-0 text-end">
                  <OverLayToolTip
                    style={{ color: darkMode ? "black" : "white" }}
                    icon={<FiEdit2 className="text-primary" />}
                    onClick={() => props.onEditSalary(item.data)}
                    tooltip={"Edit Salary"}
                  />
                  <OverLayToolTip
                    style={{ color: darkMode ? "black" : "white" }}
                    icon={<AiOutlineDelete className="fs-5 text-danger" />}
                    onClick={() => onSalaryDelete(item.data._id)}
                    tooltip={"Delete Salary"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>

            <Pagination
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            handlePaginationPrev={handlePaginationPrev}
            handlePaginationNext={handlePaginationNext}
            setCurrentPage={setCurrentPage}
            filteredDataLength={salaryData.length}
            itemsPerPage={itemsPerPage}
          />
          </>
        ) : (
          <>No Data Found</>
        )}
      </div>
    </div>
  );
};

export default AdminSalaryTable;
