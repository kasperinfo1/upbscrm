import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useTheme } from "../../Context/TheamContext/ThemeContext";

const CountryForm = ({ editData, onCountryEditUpdate, onFormEditClose }) => {
  const [countryData, setCountryData] = useState(editData["CountryName"]);
  const { darkMode } = useTheme();

  const handleChange = (e) => {
    setCountryData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCountryEditUpdate(editData, e);
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
      <h5>Edit Country Details</h5>
      <form
        className="d-flex flex-column gap-3 mt-3"
        id="form"
        onSubmit={handleSubmit}
      >
        <div>
          <lebel>Country</lebel>
          <div>
            <input
              className="form-control mt-1 rounded-0"
              type="text"
              placeholder="Country"
              name="CountryName"
              required
              value={countryData}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <button
            className="btn btn-danger"
            type="reset"
            onClick={onFormEditClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;
