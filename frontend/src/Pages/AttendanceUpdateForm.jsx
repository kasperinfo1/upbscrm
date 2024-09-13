import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import axios from 'axios';
import BASE_URL from './config/config';

const AttendanceUpdateForm = () => {
  const email = localStorage.getItem("Email");
  const [attendanceData, setAttendanceData] = useState({
    updatedBy: email,
    date: '',
    loginTime: null,
    logoutTime: null,
    remark: '',
    Email: null, // Adding selectedEmail to the attendanceData object
  });
  const [empData, setEmpData] = useState([]);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    axios
      .post(
        `${BASE_URL}/api/employeeTeam`,
        { email },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEmpData(response.data);
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  useEffect(() => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const formatDate = (date) => {
      const d = new Date(date);
      const month = '' + (d.getMonth() + 1);
      const day = '' + d.getDate();
      const year = d.getFullYear();

      return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    };

    setMinDate(formatDate(twoDaysAgo));
    setMaxDate(formatDate(today));
  }, []);

  const formatTime = (time) => {
    if (!time) return '';
    return `${time}:00`; // Append ':00' to the time in HH:MM format
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === 'loginTime' || name === 'logoutTime') {
      formattedValue = formatTime(value);
    }

    setAttendanceData({
      ...attendanceData,
      [name]: formattedValue,
    });
  };

  const handleEmailSelect = (selectedOption) => {
    setAttendanceData({
      ...attendanceData,
      Email: selectedOption ? selectedOption.value : null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(attendanceData);
    axios
    .post(
      `${BASE_URL}/api/updateAttendance`,
      attendanceData,
      {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      }
    )
    .then((response) => {
    
        console.error("Data received is not an array:", response.data);
   
    })
    .catch((error) => {
      console.error("Error fetching employee data:", error);
    });
  };

  const emailOptions = empData.map((emp) => ({
    value: emp.Email,
    label: emp.Email,
  }));

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0">Update Attendance</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="selectedEmail" className="form-label">Select Email:</label>
              <Select
                id="selectedEmail"
                name="selectedEmail"
                options={emailOptions}
                value={emailOptions.find(option => option.value === attendanceData.Email)}
                onChange={handleEmailSelect}
                placeholder="Select an email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={attendanceData.date}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="loginTime" className="form-label">Login Time:</label>
              <input
                type="time"
                id="loginTime"
                name="loginTime"
                className="form-control"
                value={attendanceData.loginTime}
                onChange={handleChange}
             
              />
            </div>

            <div className="mb-3">
              <label htmlFor="logoutTime" className="form-label">Logout Time:</label>
              <input
                type="time"
                id="logoutTime"
                name="logoutTime"
                className="form-control"
                value={attendanceData.logoutTime}
                onChange={handleChange}
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor="remark" className="form-label">Remark:</label>
              <textarea
                id="remark"
                name="remark"
                className="form-control"
                rows="3"
                value={attendanceData.remark}
                onChange={handleChange}
              />
            </div>

           

            <button type="submit" className="btn btn-primary">Update Attendance</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendanceUpdateForm;
