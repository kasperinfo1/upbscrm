import React, { useEffect, useState, useContext } from "react";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext";
import axios from "axios";
import NoticeImg from "../../img/Notice/NoticeImg.svg"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import BASE_URL from "../../Pages/config/config";
import TittleHeader from "../../Pages/TittleHeader/TittleHeader";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { MdRemoveCircleOutline } from "react-icons/md";
import profileimage from "../../img/profile.jpg"

const NoticeBoard = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const name = localStorage.getItem("Name");
  const [notice, setNotice] = useState([]);
  const { darkMode } = useTheme();
  const { socket } = useContext(AttendanceContext);
  const id = localStorage.getItem("_id");
 

  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/notice/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setNotice(response.data);
      })
      .catch((error) => {
        console.log(error);
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
  };

  const deleteHandler = (id, creator) => {
   
    axios
      .post(`${BASE_URL}/api/noticeDelete`, { noticeId: id })
      .then((res) => {
        alert("Notice deleted");
        loadEmployeeData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  return (
    <div style={{ maxHeight:'85vh', overflow:'auto'}} className="container-fluid box-shadow: 0 4px 10px 0 rgb(137 137 137 / 25%); h-100">
      <TittleHeader
        title={"Notice Board"}
        numbers={notice.length}
        message={"You can view all the notices here."}
      />
      {notice.length > 0 ? ( <div

className="mx-auto row row-gap-1 rounded-0 position-relative"
>
{notice.map((val) => (
<div key={val.noticeId} className="col-12 col-md-6 col-lg-4 p-2">
  <div
    className="d-flex flex-column shadow-sm border rounded p-2 justify-content-between gap-2"
    style={{
      backgroundColor: darkMode
        ? "var(--secondaryDashMenuColor)"
        : "var(--secondaryDashColorDark)",
        overflow:'hidden'
    }}
  >
    {/* Header with creator details */}
    <div  className="d-flex align-items-center gap-2">
      <div
        style={{
          height: "35px",
          width: "35px",
          borderRadius: "50%",
          background: "blue",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={val.creatorProfile? val.creatorProfile.image_url:profileimage}

          alt=""
        />
      </div>
      <div style={{color : darkMode ? "black" : "white"}} className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex flex-column">
          <h6 className="m-0 mx-1">{val.creator}</h6>
          <span
            style={{
              width: "fit-content",
              background: darkMode ? "#2f99ea4a" : "#2c2cf341",
              color: darkMode ? "#572be8f0" : "#c8c2feed",
            }}
            className="p-0 px-2 text-primary rounded-3"
          >
                             {val.creatorPosition} 

          </span>
        </div>
        {/* Action buttons */}
        <div className="d-flex align-items-center gap-2">
          {/* View Attachment */}
          <span
            onClick={() => pdfHandler(val.attachments)}
            title="View Attachment"
            style={{
              background: darkMode ? "#2f99ea4a" : "#2c2cf341",
              color: darkMode ? "#572be8f0" : "#c8c2feed",
              height: "1.8rem",
              width: "1.8rem",
            }}
            className="btn d-flex align-items-center justify-content-center mr-3 rounded-5 p-0"
          >
            <LuEye className="fs-5" />
          </span>
          {/* Download Attachment */}
          <a
            title="Download Attachment"
            style={{
              background: darkMode ? "#2f99ea4a" : "#2c2cf341",
              color: darkMode ? "#572be8f0" : "#c8c2feed",
              height: "1.8rem",
              width: "1.8rem",
            }}
            className="btn d-flex align-items-center justify-content-center mr-3 rounded-5 p-0"
            href={val.attachments}
            download={true}
          >
            <IoCloudDownloadOutline className="fs-5" />
          </a>
          {/* Delete Notice Button */}
          {(route === "hr" || route === "manager") &&
          val.creator === name ? (
            <MdRemoveCircleOutline
              title="Remove Notice"
              style={{
                background: darkMode ? "#ea2f2f49" : "#f32c2c41",
                color: darkMode ? "#e82b2bef" : "#fc6b6bec",
                height: "1.8rem",
                width: "1.8rem",
              }}
              className="btn d-flex align-items-center justify-content-center rounded-5 p-0"
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(val._id, val.creator);
              }}
            />
          ) : route === "admin" ? (
            <MdRemoveCircleOutline
              title="Remove Notice"
              style={{
                background: darkMode ? "#ea2f2f49" : "#f32c2c41",
                color: darkMode ? "#e82b2bef" : "#fc6b6bec",
                height: "1.8rem",
                width: "1.8rem",
              }}
              className="btn d-flex align-items-center justify-content-center rounded-5 p-0"
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(val._id, val.creator);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
    <div style={{color : darkMode ? "black" : "white"}}
      dangerouslySetInnerHTML={{ __html: val.notice }}
    />
  </div>
</div>
))}


</div>) : (<div
          className="d-flex flex-column gap-3 align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <img
            style={{ width: "15rem", height: "auto" }}
            src={NoticeImg}
            alt="No task found"
          />
          <p
            style={{
              color: darkMode
                ? "var(--primaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
          >
           There is no notice found at this moment.
          </p>
        </div>)}
     
    </div>
  );
};

export default NoticeBoard;



