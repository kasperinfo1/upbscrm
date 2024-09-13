import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config/config";
import "./StateForm.css";
import { useTheme } from "../../Context/TheamContext/ThemeContext";

const StateForm = ({ editData, onStateEditUpdate, onFormEditClose }) => {
  const [stateData, setStateData] = useState(editData["StateName"]);
  const [countryInfo, setCountryInfo] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const loadCountryInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/country`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        });
        setCountryInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCountryInfo();
  }, []);

  const handleChange = (e) => {
    setStateData(e.target.value);
  };

  const handleSubmit = (e) => {
    onStateEditUpdate(editData, e);
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
      <h5>Edit State Details</h5>
      <form className="d-flex flex-column gap-3 mt-3" onSubmit={handleSubmit}>
        <div>
          <label>Country</label>
          <div>
            <select className="form-select rounded-0" name="country" required>
              <option value="" disabled selected>
                Select your option
              </option>
              {countryInfo.map((data) => (
                <option
                  key={data["_id"]}
                  value={data["_id"]}
                  selected={editData["country"][0]["_id"] === data["_id"]}
                >
                  {data["CountryName"]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label>State</label>
          <div>
            <input
              className="form-control rounded-0"
              type="text"
              placeholder="State"
              name="StateName"
              required
              value={stateData}
              onChange={handleChange}
            />
          </div>
        </div>

        <div  className="d-flex gap-3">
        <button className="btn btn-primary " type="submit">Update</button>
            <button className="btn btn-danger " type="reset" onClick={onFormEditClose}>
              Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default StateForm;
