

import React, { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BASE_URL from "../../../Pages/config/config";
import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
import { useTheme } from "../../../Context/TheamContext/ThemeContext";
import toast from "react-hot-toast";
import "./NoticeManagement.css";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const NoticeManagement = () => {
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  const route = useLocation().pathname.split("/")[1];
  const history = useHistory();
  const [newTask, setNewTask] = useState({
    notice: "",
    attachments: null,
  });
  const [error, setError] = useState("");
  const { darkMode } = useTheme();

  const isFormValid = () => {
    return newTask.notice.trim() !== "";
  };

  const sendNotice = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fill in the required fields.");
      return;
    }

    let formData = new FormData();
    const noticeId = uuid();
    formData.append("noticeId", noticeId);
    formData.append("notice", newTask.notice);
    formData.append("file", newTask.attachments);
    formData.append("creator", name);
    formData.append("creatorMail", email);

    try {
      await axios.post(`${BASE_URL}/api/notice`, formData);
      toast.success("Notice sent successfully!");
      setNewTask({
        notice: "",
        attachments: null,
      });
      setError("");
        // Navigate to the notice board
        history.push(`/${route}/NoticeBoard`);
    }
     catch (err) {
      console.log(err);
      toast.error("Failed to send notice. Please try again.");

    }
  };

  const handleNoticeChange = (value) => {
    setNewTask({ ...newTask, notice: value });
    setError(""); // Clear error when user starts typing
  };

  const handleFileChange = (e) => {
    setNewTask({ ...newTask, attachments: e.target.files[0] });
    setError(""); // Clear error when user changes the file
  };

  return (
    <div
      style={{
        color: darkMode
          ? "var(--primaryDashColorDark)"
          : "var(--secondaryDashMenuColor)",
        height: "95vh",
      }}
      className={`container-fluid py-2 ${
        darkMode ? "ql-snow-dark" : "ql-snow"
      }`}
    >
      <TittleHeader
        title={"Send new Notice"}
        message={"Create notice or announcement from here."}
      />
      <form onSubmit={sendNotice} className="mt-3 d-flex flex-column gap-3">
        <div>
          <label>Notice</label>
          <ReactQuill
            theme="snow"
            value={newTask.notice}
            onChange={handleNoticeChange}
            placeholder="Please mention topic for the notice or announcement"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                ["blockquote", "code-block"],
                [{ align: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            className={darkMode ? "quill-toolbar-dark" : "quill-toolbar-light"}
          />
          {error && newTask.notice.trim() === "" && (
            <small className="text-danger">{error}</small>
          )}
        </div>
        <div>
          <label>Attachments</label>
          <input
            className="form-control rounded-0"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div className="d-flex">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid()}
          >
            Send Notice
          </button>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default NoticeManagement;



// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Button, Container, Form } from "react-bootstrap";
// import { v4 as uuid } from "uuid";
// import BASE_URL from "../../../Pages/config/config";
// import TittleHeader from "../../../Pages/TittleHeader/TittleHeader";
// import { useTheme } from "../../../Context/TheamContext/ThemeContext";
// import { toast } from "react-hot-toast";
// import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";



// const NoticeManagement = () => {
//   const route = useLocation().pathname.split("/")[1];
//   const name = localStorage.getItem("Name");
//   const [newTask, setNewTask] = useState({
//     notice: "",
//     attachments: null,
//   });
//   const { darkMode } = useTheme();
//   const isFormValid = () => {
//     return newTask.notice.trim() !== "";
//   };
//   const history = useHistory();

//   const sendNotice = async () => {
//     let formData = new FormData();
//     const noticeId = uuid();
//     formData.append("noticeId", noticeId);
//     formData.append("notice", newTask.notice);
//     formData.append("file", newTask.attachments);
//     formData.append("creator", name);
//     // console.log(newTask);
//     // socket.emit('sendNotice', formData);
//     axios
//       .post(`${BASE_URL}/api/notice`, formData)
//       .then((res) => {
//         // alert("Notice send");
//         toast.success("Notice sent successfully!");
        
//         setNewTask({
//           notice: "",
//           attachments: null,
//         });
//          // Navigate to the notice board
//          history.push(`/${route}/NoticeBoard`);
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Failed to send notice. Please try again.");
//       });
//   };
//   return (
//     <div
//       style={{
//         color: darkMode
//           ? "var(--primaryDashColorDark)"
//           : "var(--secondaryDashMenuColor)",
//         height: "95vh",
//       }}
//       className="container-fluid py-2"
//     >
//       <TittleHeader
//         title={"Send new Notice"}
//         message={"Create notice or announcement from here."}
//       />
//       <form className="mt-3 d-flex flex-column gap-3">
//         <div>
//           <label>Notice</label>
//           <textarea
//             className="form-control rounded-0"
//             type="text"
//             required
//             placeholder="Please mention topic for the notice or announcement"
//             value={newTask.notice}
//             onChange={(e) => setNewTask({ ...newTask, notice: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Attachments</label>
//           <input
//             className="form-control rounded-0"
//             type="file"
//             multiple
//             required
//             onChange={(e) =>
//               setNewTask({ ...newTask, attachments: e.target.files[0] })
//             }
//           />
//         </div>
//         <div className="d-flex">
//           <btn
//             className="btn btn-primary"
//             onClick={sendNotice}
//             disabled={!isFormValid()}
//           >
//             Send Notice
//           </btn>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NoticeManagement;
