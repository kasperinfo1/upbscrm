import React, { Component } from "react";
import "./Role.css";
import axios from "axios";
import RoleTable from "./RoleTable.jsx";
import RoleForm from "./RoleForm.jsx";
import RoleFormEdit from "./RoleFormEdit.jsx";
import BASE_URL from "../config/config.js";

class Role extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            <RoleFormEdit
              onRoleEditUpdate={this.handleRoleEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            <RoleTable
              onAddRole={this.handleAddRole}
              onEditRole={this.handleEditRole}
            />
          )
        ) : (
          <RoleForm
            onRoleSubmit={this.handleRoleSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  handleRoleSubmit = (event) => {
    event.preventDefault();
    this.setState({ table: true });

    let body = {
      CompanyID: event.target[0].value,
      RoleName: event.target[1].value,
    };
    axios
      .post(`${BASE_URL}/api/role`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleAddRole = () => {
    this.setState({ table: false });
  };
  handleEditRole = (e) => {
    this.setState({ editForm: true });
    this.setState({ editData: e });
  };
  handleFormClose = () => {
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    this.setState({ table: true });
  };
  handleRoleEditUpdate = (info, formData1, formData2) => {
    let body = {
      CompanyID: formData1,
      RoleName: formData2,
    };
    axios
      .put(`${BASE_URL}/api/role/` + info["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Role;
