import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config/config";
import { useTheme } from "../../Context/TheamContext/ThemeContext";

const PositionForm = (props) => {
  const [positionData, setPositionData] = useState(
    props.editData["PositionName"]
  );
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const loadCompanyInfo = () => {
      axios
        .get(`${BASE_URL}/api/company`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((response) => {
          setCompanyData(response.data);
          setCompanyInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadCompanyInfo();
  }, []);

  const handlePositionChange = (e) => {
    setPositionData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onPositionEditUpdate(
      props.editData,
      e.target[0].value,
      e.target[1].value
    );
  };

  return (
    <div
      style={{
        color: darkMode
          ? "var(--primaryDashColorDark)"
          : "var(--secondaryDashMenuColor)",
      }}
      className="container-fluid py-3"
    >
      <h5>Edit Position Details</h5>

      <div>
        <form className="d-flex flex-column gap-3 mt-3" onSubmit={handleSubmit}>
          <div>
            <label>Company</label>
            <div>
              <select
                className="form-select rounded-0"
                as="select"
                name="country"
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                {companyData.map((data, index) => (
                  <option
                    key={index}
                    value={data["_id"]}
                    selected={
                      props.editData["company"][0]["_id"] === data["_id"]
                    }
                  >
                    {data["CompanyName"]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>Position</label>
            <div>
              <input
                className="form-control rounded-0"
                type="Text"
                placeholder="Position"
                name="PositionName"
                required
                value={positionData}
                onChange={handlePositionChange}
              />
            </div>
          </div>

          <div className="d-flex gap-3">
            <button className="btn btn-primary" type="submit">
              Update
            </button>{" "}
            <button
              className="btn btn-danger"
              type="reset"
              onClick={props.onFormEditClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PositionForm;
