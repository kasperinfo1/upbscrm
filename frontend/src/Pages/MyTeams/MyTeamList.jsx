import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import profile from "../../img/profile.jpg";
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../Context/TheamContext/ThemeContext';
import { AttendanceContext } from '../../Context/AttendanceContext/AttendanceContext';
import BASE_URL from '../config/config';
import { MdClose, MdKeyboardArrowRight } from 'react-icons/md';
import "./MyTeam.css";

const MyTeamList = () => {
  const history = useHistory();
  const { setManagerMail } = useContext(AttendanceContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teamData, setTeamData] = useState({});
  const { darkMode } = useTheme();

  const handleViewClick = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/employeeByDepartment`);
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleCloseModal = () => setShowModal(false);
  
  const navigationHandler = (val) => {
    setManagerMail(val.Email);
    history.push("/admin/managerTeam");
  };

  return (
    <div style={{
      height: "17rem",
      overflow: "hidden",
      color: darkMode ? "black" : "white",
      background: darkMode ? "#F5F5F6" : "#161515f6", 
    }}
    className="px-3 shadow-sm rounded-2 d-flex flex-column gap-2 justify-content-between pb-3 pt-2">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Team</h5>
        <span>{Object.keys(teamData).length}</span>
      </div>
      <div style={{
          height: "13.5rem",
          overflow: "auto",
          background: darkMode ? "#ededf1d4" : "#252424c3",
        }}
        className="rounded-3 p-2 py-2">
        <ul>
          {Object.keys(teamData).length > 0 && Object.keys(teamData).map((department, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p className='p-1 m-0'>{department}</p>
                <div className="d-flex align-items-center">
                  {teamData[department].map((member, idx) => (
                    <img
                      key={idx}
                      src={member.profile === null ? profile : member.profile.image_url}
                      alt={member.name}
                      className="rounded-circle me-2"
                      style={{ width: '25px', height: '25px' }}
                    />
                  ))}
                  {teamData[department].length > 4 ? <>+{teamData[department].length - 4}</> : <></>}
                </div>
              </div>
              <Button className='btn py-0 px-2 border rounded-5 text-decoration-none' variant="link" onClick={() => handleViewClick(department)}>View <MdKeyboardArrowRight /></Button>
            </li>
          ))}
        </ul>
      </div>

      <CustomModal style={{ background: !darkMode ? "black" : "white" }}  show={showModal} onClose={handleCloseModal} title={`${selectedDepartment}`}>
        {selectedDepartment && teamData[selectedDepartment]?.length > 0 ? (
          <div style={{color: darkMode ? "black" : "white",  }} className="m-0 d-flex flex-column gap-2">
            {teamData[selectedDepartment].map((member, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <div className='d-flex align-items-center gap-2'>
                  <div style={{ width: '25px', height: '25px' }}>
                    <img
                      src={member.profile === null ? profile : member.profile.image_url}
                      alt={member.name}
                      className="rounded-circle me-3"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span>{`${member.FirstName} ${member.LastName}`}</span>
                </div>
                <Button
                  className="btn py-0 shadow-sm px-2 border rounded-5 text-decoration-none"
                  variant="link"
                  onClick={() => navigationHandler(member)}
                >
                  View Team <MdKeyboardArrowRight />
                </Button>
              </li>
            ))}
          </div>
        ) : (
          <p>No members in this team.</p>
        )}
      </CustomModal>
    </div>
  );
};

export const CustomModal = ({ show, onClose, title, children, style }) => {
  if (!show) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  }; 

  return (
    <div onClick={onClose} className="custom-modal-overlay" style={{border:'2px solid white'}}>
      <div onClick={handleModalClick} style={style} className="custom-modal">
        <div className="custom-modal-header">
          <h6 className='fs-5'>{title}</h6>
          <button onClick={onClose} className="close-button">
            <MdClose />
          </button>
        </div>
        <div className="custom-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default MyTeamList;
