import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAttendanceData } from "../../../redux/slices/attendanceSlice";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";
import NoTeam from "../../../img/Team/NoTeam.svg";
import { AiOutlineTeam } from "react-icons/ai";

const TeamManager = () => {
  const dispatch = useDispatch();
  const { attendanceData, status, error } = useSelector(
    (state) => state.attendance
  );

  const { darkMode } = useTheme();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceData());
    }
  }, [status, dispatch]);

  const getAttendanceStatus = (loginTime) => {
    if (!loginTime) {
      return (
        <span
          className="text-danger py-1 px-2 rounded-2"
          style={{ background: "#f33d3d22" }}
        >
          Absent
        </span>
      );
    }

    const loginDate = new Date(`1970-01-01T${loginTime}`);
    const nineThirty = new Date("1970-01-01T09:30:00");
    const nineFortyFive = new Date("1970-01-01T09:45:00");
    const threePM = new Date("1970-01-01T15:00:00");

    if (loginDate < nineThirty) {
      return (
        <span
          className="text-success py-1 px-2 rounded-2"
          style={{ background: "#86ed1f3d" }}
        >
          Present
        </span>
      );
    } else if (loginDate >= nineThirty && loginDate <= nineFortyFive) {
      return (
        <span
          className="text-primary py-1 px-2 rounded-2"
          style={{ background: "#1f71ed3d" }}
        >
          Late
        </span>
      );
    } else if (loginDate > nineFortyFive && loginDate <= threePM) {
      return (
        <span
          className="py-1 px-2 rounded-2"
          style={{ background: "#f5550555", color: "#f55505" }}
        >
          Half Day
        </span>
      );
    } else {
      return (
        <span
          className="text-danger py-1 px-2 rounded-2"
          style={{ background: "#f33d3d22" }}
        >
          Absent
        </span>
      );
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const reportingManager = localStorage.getItem("Email");
  const userType = localStorage.getItem("Account");
  const MyId = localStorage.getItem("_id");

  const MyReportingManager = attendanceData
    .filter((data) => data.userId === MyId)
    .map((data) => data.reportManager)[0];

  return (
    <div
      style={{
        height: "17rem",
        overflow: "hidden",
        color: darkMode ? "black" : "White",
        background: darkMode ? "#F5F5F6" : "#161515f6",
      }}
      className="px-3 shadow-sm rounded-2 d-flex flex-column gap-2 justify-content-between pb-3 pt-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="my-0 fw-normal d-flex align-items-center gap-2">
          <AiOutlineTeam />
          Team
        </h5>{" "}
        <span
          style={{
            minHeight: "1.6rem",
            minWidth: "1.6rem",
            borderRadius: "50%",
            background: darkMode ? "#ededf1f4" : "#1b1a1af0",
          }}
          className="  d-flex align-items-center justify-content-center"
        >
          {userType >= 1 &&
            userType <= 4 &&
            attendanceData.filter(
              (data) => data.reportManager === reportingManager
            ).length}
        </span>
      </div>
      <div
        className="p-1 px-3 rounded-3"
        style={{
          height: "14rem",
          overflow: "auto",
          background: darkMode ? "#ededf1f4" : "#1b1a1af0",
        }}
      >
        {userType == 1 && (
          <div>
            {attendanceData.filter((data) => data.Account === 2).length > 0 ? (
              attendanceData
                .filter((data) => data.Account === 2)
                .map((atten, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between my-2"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          height: "2.2rem",
                          width: "2.2rem",
                          borderRadius: "50%",
                          background: "blue",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          src={atten?.profile?.image_url}
                          alt=""
                        />
                      </div>
                      <div className="text-capitalize">
                        <span
                          className="text-primary py-1 px-2 rounded-2"
                          style={{ background: "#2984da21", fontSize: ".8rem" }}
                        >
                          {atten.position.PositionName}
                        </span>
                        <br />
                        <span className="mx-1">
                          {atten.FirstName} {atten.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="ms-auto mr-3">
                      {atten?.attendance?.loginTime[0]
                        ? atten?.attendance?.loginTime[0]
                        : "--"}
                    </div>
                    <div
                      style={{ fontSize: ".8rem" }}
                      className="text-capitalize"
                    >
                      {getAttendanceStatus(atten?.attendance?.loginTime[0])}
                    </div>
                  </div>
                ))
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center gap-2"
                style={{ height: "13rem", width: "100%" }}
              >
                <img
                  style={{
                    height: "100px",
                    width: "130px",
                    objectFit: "cover",
                  }}
                  className="mx-auto"
                  src={NoTeam}
                  alt="Happy Birthday"
                />
                <p
                  style={{ opacity: "60%", fontSize: ".9rem" }}
                  className="text-center w-75 mx-auto"
                >
                  No Team Found
                </p>
              </div>
            )}
          </div>
        )}

        {userType == 2 && (
          <div>
            {attendanceData.filter((data) => data.Account === 2).length > 0 ? (
              attendanceData
                .filter((data) => data.Account === 2)
                .map((atten, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between my-2"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          height: "2.2rem",
                          width: "2.2rem",
                          borderRadius: "50%",
                          background: "blue",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          src={atten?.profile?.image_url}
                          alt=""
                        />
                      </div>
                      <div className="text-capitalize">
                        <span
                          className="text-primary py-1 px-2 rounded-2"
                          style={{ background: "#2984da21", fontSize: ".8rem" }}
                        >
                          {atten.position.PositionName}
                        </span>
                        <br />
                        <span className="mx-1">
                          {atten.FirstName} {atten.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="ms-auto mr-3">
                      {atten?.attendance?.loginTime[0]
                        ? atten?.attendance?.loginTime[0]
                        : "--"}
                    </div>
                    <div
                      style={{ fontSize: ".8rem" }}
                      className="text-capitalize"
                    >
                      {getAttendanceStatus(atten?.attendance?.loginTime[0])}
                    </div>
                  </div>
                ))
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center gap-2"
                style={{ height: "13rem", width: "100%" }}
              >
                <img
                  style={{
                    height: "100px",
                    width: "130px",
                    objectFit: "cover",
                  }}
                  className="mx-auto"
                  src={NoTeam}
                  alt="Happy Birthday"
                />
                <p
                  style={{ opacity: "60%", fontSize: ".9rem" }}
                  className="text-center w-75 mx-auto"
                >
                  No Team Found
                </p>
              </div>
            )}
          </div>
        )}

        {userType == 3 && (
          <div>
            {attendanceData.filter(
              (data) => data.reportManager === MyReportingManager
            ).length > 0 ? (
              attendanceData
                .filter((data) => data.reportManager === MyReportingManager)
                .map((atten, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between my-2"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          height: "2.2rem",
                          width: "2.2rem",
                          borderRadius: "50%",
                          background: atten?.profile?.image_url
                            ? "transparent"
                            : "blue",
                        }}
                      >
                        {atten?.profile?.image_url ? (
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                            src={atten?.profile?.image_url}
                            alt="Profile"
                          />
                        ) : null}
                      </div>
                      <div className="text-capitalize">
                        <span
                          className="text-primary py-1 px-2 rounded-2"
                          style={{ background: "#2984da21", fontSize: ".8rem" }}
                        >
                          {atten.position.PositionName}
                        </span>
                        <br />
                        <span className="mx-1">
                          {atten.FirstName} {atten.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="ms-auto mr-3">
                      {atten?.attendance?.loginTime[0]
                        ? atten?.attendance?.loginTime[0]
                        : "--"}
                    </div>
                    <div
                      style={{ fontSize: ".8rem" }}
                      className="text-capitalize"
                    >
                      {getAttendanceStatus(atten?.attendance?.loginTime[0])}
                    </div>
                  </div>
                ))
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center gap-2"
                style={{ height: "13rem", width: "100%" }}
              >
                <img
                  style={{
                    height: "100px",
                    width: "130px",
                    objectFit: "cover",
                  }}
                  className="mx-auto"
                  src={NoTeam}
                  alt="Happy Birthday"
                />
                <p
                  style={{ opacity: "60%", fontSize: ".9rem" }}
                  className="text-center w-75 mx-auto"
                >
                  No Team Found
                </p>
              </div>
            )}
          </div>
        )}

        {userType == 4 && (
          <div>
            {attendanceData.filter(
              (data) => data.reportManager === reportingManager
            ).length > 0 ? (
              attendanceData
                .filter((data) => data.reportManager === reportingManager)
                .map((atten, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between my-2"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          height: "2.2rem",
                          width: "2.2rem",
                          borderRadius: "50%",
                          background: "blue",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          src={atten?.profile?.image_url}
                          alt=""
                        />
                      </div>
                      <div className="text-capitalize">
                        <span
                          className="text-primary py-1 px-2 rounded-2"
                          style={{ background: "#2984da21", fontSize: ".8rem" }}
                        >
                          {atten.position.PositionName}
                        </span>
                        <br />
                        <span className="mx-1">
                          {atten.FirstName} {atten.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="ms-auto mr-3">
                      {atten?.attendance?.loginTime[0]
                        ? atten?.attendance?.loginTime[0]
                        : "--"}
                    </div>
                    <div
                      style={{ fontSize: ".8rem" }}
                      className="text-capitalize"
                    >
                      {getAttendanceStatus(atten?.attendance?.loginTime[0])}
                    </div>
                  </div>
                ))
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center gap-2"
                style={{ height: "13rem", width: "100%" }}
              >
                <img
                  style={{
                    height: "100px",
                    width: "130px",
                    objectFit: "cover",
                  }}
                  className="mx-auto"
                  src={NoTeam}
                  alt="Happy Birthday"
                />
                <p
                  style={{ opacity: "60%", fontSize: ".9rem" }}
                  className="text-center w-75 mx-auto"
                >
                  No Team Found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManager;
