import React, { useEffect, useState, useContext } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AttendanceContext } from "../../../Context/AttendanceContext/AttendanceContext";
import axios from "axios";
import NoticeBadge from "../../../img/NoticeBadge.svg";
import BASE_URL from "../../../Pages/config/config";
const NoticeBoard = () => {
  const [notice, setNotice] = useState([]);
  const { socket } = useContext(AttendanceContext);
  const id = localStorage.getItem("_id");
  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/particularEmployee/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setNotice(response.data.Notice);
      })
      .catch((error) => {
          
      });
  };
  useEffect(() => {
    loadEmployeeData();
  }, []);
  useEffect(() => {
      
    if (socket) {
      socket.on("notice", (data) => {
        setNotice((prev) => [data, ...prev]);
      });
      socket.on("noticeDelete", (data) => {
        if (data) {
          loadEmployeeData();
        }
      });
    }
  }, [socket]);
  const pdfHandler = (path) => {
    window.open(`${BASE_URL}/${path}`, "_blank", "noreferrer");
    // window.open(path, "_blank")
  };
  const deleteHandler = (id) => {
    axios
      .post(`${BASE_URL}/api/noticeDelete`, { noticeId: id })
      .then((res) => {
        alert("Notice delete");
      })
      .catch((err) => {
          console.log(err)
      });
  };
  return (
    <div className="container box-shadow: 0 4px 10px 0 rgb(137 137 137 / 25%); p-0 h-100 ">
      <div className="birthday">
        <h5
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "var(--primaryDashColorDark)",
            color: "var(--primaryDashMenuColor)",
          }}
          className="fw-bolder pb-3 px-3 pt-3 d-flex justify-content-between gap-0 text-center"
        >
          Notice Board{" "}
          {notice && <span className="text-primary">({notice.length})</span>}
        </h5>
        <div
          className="mainbirth"
          style={{ maxWidth: "100%", overflowX: "auto" }}
        >
          {notice && notice.length > 0 ? (
              <div style={{
                // maxHeight: "68vh",
                overflow: "auto",
                position: "relative",
              }}
              className="table-responsive p-2 mb-3">  
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th className="cursor-pointer" style={{ width: "80%" }}>
                    Notice
                  </th>
                  <th style={{ width: "80%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {notice
                  .filter(
                    (val, i, ar) =>
                      ar.findIndex((item) => item.noticeId === val.noticeId) ===
                      i
                  )
                  .map((val) => (
                    <tr key={val.noticeId} style={{ cursor: "pointer" }}>
                      <td
                        onClick={() => pdfHandler(val.attachments)}
                      >{`${val.notice}`}</td>
                      <td
                        style={{
                          fontSize: "22px",
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        <TiDeleteOutline
                          onClick={() => deleteHandler(val.noticeId)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div
              className="d-flex flex-column justify-content-center aline-items-center gap-3"
              style={{ height: "100%", width: "100%" }}
            >
              <img
                style={{ height: "70%", width: "60%" }}
                className="mx-auto"
                src={NoticeBadge}
                alt="Happy Birthday"
              />
              <p
                style={{ opacity: "60%", fontSize: "13px" }}
                className="text-center w-75 mx-auto  fw-bold text-muted "
              >
                Notice Not Assigned
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
