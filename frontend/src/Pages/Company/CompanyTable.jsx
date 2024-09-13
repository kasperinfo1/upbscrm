import React, { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../config/config";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import OverLayToolTip from "../../Utils/OverLayToolTip";
import { FiEdit2 } from "react-icons/fi";
import Pagination from "../../Utils/Pagination";
import { rowBodyStyle, rowHeadStyle } from "../../Style/TableStyle";

const AdminCompanyTable = (props) => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const { darkMode } = useTheme();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/company`, {
        headers: { authorization: localStorage.getItem("token") || "" },
      })
      .then((response) => {
        setCompanyData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const onCompanyDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/company/${id}`, {
          headers: { authorization: localStorage.getItem("token") || "" },
        })
        .then(() =>
          setCompanyData(companyData.filter((item) => item._id !== id))
        )
        .catch((err) => console.log(err));
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
  const currentItems = companyData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(companyData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container-fluid py-2">
      <div className="d-flex justify-content-between py-2">
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
            Company Details ({companyData.length})
          </h5>
          <p
            style={{
              color: darkMode
                ? "var(--secondaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
            className=" m-0"
          >
            You can see all Company list here
          </p>
        </div>
        <button
          className="btn btn-primary gap-1 d-flex  my-auto align-items-center justify-content-center"
          onClick={props.onAddCompany}
        >
          <AiOutlinePlusCircle className="fs-4" />
          <span className="d-none d-md-flex">Create Company</span>
        </button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <RingLoader size={50} color={"#0000ff"} loading={true} />
        </div>
      )}

      <div
        style={{
          color: darkMode
            ? "var(--secondaryDashColorDark)"
            : "var(--secondaryDashMenuColor)",
          overflow: "auto",
          maxHeight: "80vh",
          minHeight: "80vh",
          position: "relative",
        }}
      >
        {companyData.length > 0 ? (
          <>
            <div style={{
          // maxHeight: "68vh",
          overflow: "auto",
          position: "relative",
        }}
        className="table-responsive p-2 mb-3">  
            <table className="table" style={{ fontSize: ".9rem" }}>
              <thead>
                <tr>
                  <th style={rowHeadStyle(darkMode)}>Company Name</th>
                  <th style={rowHeadStyle(darkMode)}>Address</th>
                  <th style={rowHeadStyle(darkMode)}>Country</th>
                  <th style={rowHeadStyle(darkMode)}>State</th>
                  <th style={rowHeadStyle(darkMode)}>City</th>
                  <th style={rowHeadStyle(darkMode)}>Postal Code</th>
                  <th style={rowHeadStyle(darkMode)}>Website</th>
                  <th style={rowHeadStyle(darkMode)}>Email</th>
                  <th style={rowHeadStyle(darkMode)}>Contact Person</th>
                  <th style={rowHeadStyle(darkMode)}>Contact No</th>
                  <th style={rowHeadStyle(darkMode)}>Fax No</th>
                  <th style={rowHeadStyle(darkMode)}>Pan No</th>
                  <th style={rowHeadStyle(darkMode)}>GST No</th>
                  <th style={rowHeadStyle(darkMode)}>CIN No</th>
                  <th className="text-end" style={rowHeadStyle(darkMode)}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td style={rowBodyStyle(darkMode)}>{item.CompanyName}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.Address}</td>
                    <td style={rowBodyStyle(darkMode)}>
                      {item.city[0].state[0].country[0].CountryName}
                    </td>
                    <td style={rowBodyStyle(darkMode)}>
                      {item.city[0].state[0].StateName}
                    </td>
                    <td style={rowBodyStyle(darkMode)}>{item.city[0].CityName}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.PostalCode}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.Website}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.Email}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.ContactPerson}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.ContactNo}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.FaxNo}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.PanNo}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.GSTNo}</td>
                    <td style={rowBodyStyle(darkMode)}>{item.CINNo}</td>
                    <td className="text-end" style={rowBodyStyle(darkMode)}>
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<FiEdit2 className="text-primary" />}
                        onClick={() => props.onEditCompany(item)}
                        tooltip={"Edit Company"}
                      />
                      <OverLayToolTip
                        style={{ color: darkMode ? "black" : "white" }}
                        icon={<AiOutlineDelete className="fs-5 text-danger" />}
                        onClick={() => onCompanyDelete(item._id)}
                        tooltip={"Delete Company"}
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
            filteredDataLength={companyData.length}
            itemsPerPage={itemsPerPage}
          />
          </>
        ) : (
          !loading && <div className="text-center py-5">No companies found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminCompanyTable;
