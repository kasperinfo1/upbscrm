import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../config/config";
import { useTheme } from "../../Context/TheamContext/ThemeContext";

const CityForm = ({ editData, onCityEditUpdate, onFormEditClose }) => {
  const [cityData, setCityData] = useState(editData["CityName"]);
  const [stateData, setStateData] = useState([]);
  const [filteredStateData, setFilteredStateData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const {darkMode} = useTheme()

  useEffect(() => {
    const loadCountryInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/country`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        });
        setCountryData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const loadStateInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/state`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        });
        setStateData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCountryInfo();
    loadStateInfo();
  }, []);

  const onCountryChange = (e) => {
    const currentCountry = e.target.value;
    const filteredState = stateData.filter(
      (data) => data["country"][0]["_id"] === currentCountry
    );
    setFilteredStateData(filteredState);
  };

  const onChange = (e) => {
    setCityData(e.target.value);
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
      <h5 >Edit City Details</h5>

      <form className="d-flex flex-column gap-3 mt-3" onSubmit={(e) => onCityEditUpdate(editData, e)}>
          <div>
            <label>
              Country
            </label>
            <div>
              <select
                className="form-select rounded-0"
                name="country"
                onChange={onCountryChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select your option
                </option>
                {countryData.map((data, index) => (
                  <option key={index} value={data["_id"]}>
                    {data["CountryName"]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>
              State
            </label>
            <div>
              <select className="form-select rounded-0"  name="state" required>
                <option value="" disabled>
                  Select your option
                </option>
                {filteredStateData.map((data, index) => (
                  <option
                    key={index}
                    value={data["_id"]}
                    selected={
                      editData["state"][0]["_id"] === data["_id"]
                    }
                  >
                    {data["StateName"]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>
              City
            </label>
            <div>
              <input className="form-control rounded-0"
                type="text"
                placeholder="City"
                name="City"
                required
                onChange={onChange}
                value={cityData}
              />
            </div>
          </div>

          <div className="d-flex gap-2">
          <button className="btn btn-primary " type="submit">Update</button>
          <button className="btn btn-danger " type="reset" onClick={onFormEditClose}>
                Cancel
              </button>
            
          </div>
        </form>
    </div>
  );
};

export default CityForm;