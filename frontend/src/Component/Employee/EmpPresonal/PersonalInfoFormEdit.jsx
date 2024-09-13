import React, { useState } from "react";
import "./PersonalInfoFormEdit.css";
import { Form, Col, Row } from "react-bootstrap";
import { LuFileEdit } from "react-icons/lu";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";

const PersonalInfoFormEdit = (props) => {
  const [state, setState] = useState({
    GenderData: props.editData["Gender"],
    presonalEmail: props.editData["Email"],
    FirstNameData: props.editData["FirstName"],
    LastNameData: props.editData["LastName"],
    DOBData: props.editData["DOB"].slice(0, 10),
    ContactNoData: props.editData["ContactNo"],
    EmergencyContactNoData: props.editData["EmergencyContactNo"] || "",
    PANcardNoData: props.editData["PANcardNo"] || "",
    HobbiesData: props.editData["Hobbies"] || "",
    PresentAddressData: props.editData["PresentAddress"] || "",
    PermanetAddressData: props.editData["PermanetAddress"] || "",
    presonalEmail: props.editData["presonalEmail"] || "",
    profile: "",
  });
  const { darkMode } = useTheme();

  const [profileFile, setProfileFile] = useState(null);

  const onpresonalEmailChange = (e) => {
    setState({ ...state, presonalEmail: e.target.value });
  };

  const onFirstNameDataChange = (e) => {
    setState({ ...state, FirstNameData: e.target.value });
  };

  const onLastNameDataChange = (e) => {
    setState({ ...state, LastNameData: e.target.value });
  };

  const onContactNoDataChange = (e) => {
    setState({ ...state, ContactNoData: e.target.value });
  };

  const onPANcardNoDataChange = (e) => {
    setState({ ...state, PANcardNoData: e.target.value });
  };

  const onEmergencyContactNoDataChange = (e) => {
    setState({ ...state, EmergencyContactNoData: e.target.value });
  };

  const onHobbiesDataChange = (e) => {
    setState({ ...state, HobbiesData: e.target.value });
  };

  const onPresentAddressDataChange = (e) => {
    setState({ ...state, PresentAddressData: e.target.value });
  };

  const onPermanentAddressDataChange = (e) => {
    setState({ ...state, PermanetAddressData: e.target.value });
  };

  const onGenderChange = (e) => {
    setState({ ...state, GenderData: e.target.value });
    props.onGenderChange(e);
  };

  const onDOBDataChange = (e) => {
    setState({ ...state, DOBData: e.target.value });
  };

  const onProfileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  return (
    <div
      style={{
        background: darkMode
          ? "var(--secondaryDashMenuColor)"
          : "var(--secondaryDashColorDark)",
        color: darkMode
          ? "var(--secondaryDashColorDark)"
          : "var(--primaryDashMenuColor)",
      }}
      className="container-fluid position-relative"
    >
      <div
        style={{ marginTop: "-.5rem", minHeight: "95vh", overflow: "auto" }}
        className="row p-2"
      >
        <div className="">
          <div className="">
            <Form
              className="row row-gap-2 rounded-2 m-auto justify-content-between"
              onSubmit={(e) =>
                props.onPersonalInfoEditUpdate(props.editData, e)
              }
            >
              <h5
                style={{ position: "sticky", top: "0", zIndex: "2" }}
                className="label d-flex align-items-center gap-2 py-3 w-100"
              >
                Edit Employee info
              </h5>
              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  First Name
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="text"
                    placeholder="First Name"
                    required
                    disabled
                    value={state.FirstNameData}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Last Name
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="text"
                    placeholder="Last Name"
                    disabled
                    required
                    value={state.LastNameData}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Col className="d-flex  flex-column gap-3 m-0 p-0">
                  <label className="label p-2 m-0 " column>
                    Gender
                  </label>

                  <div className="d-flex m-0 ">
                    <Form.Check
                      inline
                      style={{
                        color: darkMode
                          ? "var(--secondaryDashColorDark)"
                          : "var(--primaryDashMenuColor)",
                      }}
                      type="radio"
                      label="Male"
                      value="male"
                      name="gender"
                      className="d-flex gap-1  px-5"
                      onChange={onGenderChange}
                      checked={state.GenderData == "male"}
                      required
                    />
                    <Form.Check
                      inline
                      style={{
                        color: darkMode
                          ? "var(--secondaryDashColorDark)"
                          : "var(--primaryDashMenuColor)",
                      }}
                      type="radio"
                      label="Female"
                      value="female"
                      name="gender"
                      className="d-flex gap-1"
                      onChange={onGenderChange}
                      checked={state.GenderData == "female"}
                      required
                    />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Contact No
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="text"
                    placeholder="Contact No "
                    required
                    value={state.ContactNoData}
                    onChange={onContactNoDataChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Emergency Contact
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="text"
                    placeholder="Emergency Contact No"
                    required
                    value={state.EmergencyContactNoData}
                    onChange={onEmergencyContactNoDataChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Presonal Email
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="email"
                    placeholder="presonalEmail"
                    required
                    value={state.presonalEmail}
                    onChange={onpresonalEmailChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  PAN Card No
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="text"
                    placeholder="PAN Card No"
                    required
                    value={state.PANcardNoData}
                    onChange={onPANcardNoDataChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  DOB
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="date"
                    placeholder="DOB"
                    disabled
                    value={state.DOBData}
                    onChange={onDOBDataChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Blood Group
                </Form.Label>

                <Col className="form-input">
                  <Form.Control className="rounded-0" as="select" required>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option
                      value="A+"
                      selected={props.editData["BloodGroup"] == "A+"}
                    >
                      A+
                    </option>
                    <option
                      value="A-"
                      selected={props.editData["BloodGroup"] == "A-"}
                    >
                      A-
                    </option>
                    <option
                      value="B+"
                      selected={props.editData["BloodGroup"] == "B+"}
                    >
                      B+
                    </option>
                    <option
                      value="B-"
                      selected={props.editData["BloodGroup"] == "B-"}
                    >
                      B-
                    </option>
                    <option
                      value="AB+"
                      selected={props.editData["BloodGroup"] == "AB+"}
                    >
                      AB+
                    </option>
                    <option
                      value="AB-"
                      selected={props.editData["BloodGroup"] == "AB-"}
                    >
                      AB-
                    </option>
                    <option
                      value="O+"
                      selected={props.editData["BloodGroup"] == "O+"}
                    >
                      O+
                    </option>
                    <option
                      value="O-"
                      selected={props.editData["BloodGroup"] == "O-"}
                    >
                      O-
                    </option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-4 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Hobbies
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="text"
                    placeholder="Hobbies"
                    required
                    value={state.HobbiesData}
                    onChange={onHobbiesDataChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-sm-6 col-md-8 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Profile Image{" "}
                  <span style={{ fontSize: ".7rem", fontWeight: "normal" }}>
                    ( file size must between 200 KB to 2 MB )
                  </span>
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    type="file"
                    onChange={onProfileChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-sm-6 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Present Address
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    as="textarea"
                    rows="3"
                    placeholder="Present Address"
                    required
                    value={state.PresentAddressData}
                    onChange={onPresentAddressDataChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-sm-6 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="label " column>
                  Permanet Address
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    className="rounded-0"
                    as="textarea"
                    rows="3"
                    placeholder="Permanent Address"
                    value={state.PermanetAddressData}
                    onChange={onPermanentAddressDataChange}
                  />
                </Col>
              </Form.Group>

              <div className="d-flex m-0 gap-3 py-2">
                <button className="btn btn-primary px-5" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-danger px-5"
                  type="reset"
                  onClick={props.onFormEditClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFormEdit;
