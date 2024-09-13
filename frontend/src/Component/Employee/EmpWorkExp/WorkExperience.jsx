import React, { useState } from "react";
import axios from "axios";
import WorkExperienceTable from "./WorkExperienceTable.jsx";
import WorkExperienceForm from "./WorkExperienceForm.jsx";
import WorkExperienceFormEdit from "./WorkExperienceFormEdit.jsx";
import "./WorkExperience.css";
import BASE_URL from "../../../Pages/config/config.js";

const WorkExperience = (props) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleWorkExperienceSubmit = (event, id) => {
    event.preventDefault();
      
    setTable(true);

    let body = {
      CompanyName: event.target[0].value,
      Designation: event.target[1].value,
      FromDate: event.target[2].value,
      ToDate: event.target[3].value,
    };

    axios
      .post(`${BASE_URL}/api/work-experience/` + id, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
          
      });
  };

  const handleAddWorkExperience = () => {
      
    setTable(false);
  };

  const handleEditWorkExperience = (e) => {
      
      
    setEditForm(true);
    setEditData(e);
  };

  const handleFormClose = () => {
      
    setTable(true);
  };

  const handleEditFormClose = () => {
      
    setEditForm(false);
  };

  const handleWorkExperienceEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
      
    let body = {
      CompanyName: newInfo.target[0].value,
      Designation: newInfo.target[1].value,
      FromDate: newInfo.target[2].value,
      ToDate: newInfo.target[3].value,
    };
      
    axios
      .put(`${BASE_URL}/api/work-experience/` + info["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
          
      });

    setEditForm(false);
  };
  const handleAddFormGenderChange = () => {};

  return (
    <React.Fragment>
      {table ? (
        editForm ? (
          <WorkExperienceFormEdit
            onWorkExperienceEditUpdate={handleWorkExperienceEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <WorkExperienceTable
            onAddWorkExperience={handleAddWorkExperience}
            onEditWorkExperience={handleEditWorkExperience}
            data={props.data}
            back={props.back}
          />
        )
      ) : (
        <WorkExperienceForm
          onWorkExperienceSubmit={handleWorkExperienceSubmit}
          onFormClose={handleFormClose}
          onGenderChange={handleAddFormGenderChange}
          data={props.data}
        />
      )}
    </React.Fragment>
  );
};

export default WorkExperience;
