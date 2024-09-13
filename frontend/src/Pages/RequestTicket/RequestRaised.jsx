import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";
import { useTheme } from "../../Context/TheamContext/ThemeContext";
import { getTimeAgo } from "../../Utils/GetDayFormatted";
import RequestImage from "../../img/Request/Request.svg";
import BASE_URL from "../config/config";
import toast from "react-hot-toast";

const RequestRaised = () => {
  const email = localStorage.getItem("Email");
  const [data, setData] = useState([]);
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    remark: "",
    updatedBy: email,
    status: "",
  });
  const [selectedRequest, setSelectedRequest] = useState(null);

  const MyEmail = localStorage.getItem("Email");

  const fetchRequests = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/requestRaised`,
        { email },
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      );
      const fetchedData = response.data;
      const pendingRequests = fetchedData.filter(
        (request) => request.status === "Pending"
      );
      setData(pendingRequests);
    } catch (error) {
      console.error("Error loading request data", error);
    }
  };

  // UseEffect to fetch data
  useEffect(() => {
    fetchRequests();
  }, [email]);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (req) => {
    setUpdateData((prev) => ({
      ...prev,
      id: req._id,
      status: req.status === "Close" ? "Pending" : "Close",
    }));
    setShowModal(true);
  };

  const handleRemarkChange = (event) =>
    setUpdateData((prev) => ({ ...prev, remark: event.target.value }));

  const handleSaveRemark = () => {
    axios
      .post(`${BASE_URL}/api/updateRequest`, updateData, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        console.log("done");
        data.forEach((val) => {
          if (val._id === updateData.id) {
            val.status = updateData.status;
            val.reOpen.push({
              remark: updateData.remark,
              updatedBy: email,
              updatedAt: new Date(),
            });
          }
        });
        setUpdateData({
          id: "",
          remark: "",
          updatedBy: email,
          status: "",
        });
        toast.success(`Request is ${updateData.status}`)

        fetchRequests();
      })
      .catch((error) => {
        toast.error(`Error updating request data`)

        console.error("Error updating request data", error);
      });
    handleCloseModal();
  };

  const isCompleteButtonDisabled = (val) => {
    console.log(val);
    if (val) {
      const updatedAtTime = moment(val.updatedAt);
      const currentTime = moment();
      return currentTime.diff(updatedAtTime, "hours") > 72;
    }
  };

  const ForatedDT = (data) => {
    const date = new Date(data);

    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return formattedDate + " " + formattedTime;
  };

  return (
    <div
      style={{ height: "90vh", overflow: "hidden" }}
      className="container-fluid py-2"
    >

      {data.length > 0 ? (
        <div
          style={{ height: "88vh", overflow: "auto" }}
          className="row mx-auto"
        >
                <h5
              className="my-2 mb-3"
              style={{ color: !darkMode ? "white" : "gray", fontWeight: 600 }}
            >
              Pending Request's ( {data.length} )
            </h5>
          <div
            style={{ height: "86vh", overflow: "auto" }}
            className="col-12 col-md-6 col-lg-3 pb-3 mb-5"
          >
            
            <div className="d-flex flex-column gap-2">
              {data
                .slice()
                .reverse()
                .map((request) => (
                  <div className="" key={request._id}>
                    <div
                      className="card border-0 shadow-sm"
                      onClick={() => setSelectedRequest(request)}
                      role="button"
                      style={{
                        backgroundColor:
              selectedRequest?._id === request._id
                ? darkMode
                  ? "rgba(40, 67, 135, .3)"
                  : "rgba(1, 1, 122,.5)"
                : !darkMode
                ? "black"
                : "white",
            color: !darkMode ? "white" : "black",
                        color: !darkMode ? "white" : "black",
                      }}
                    >
                      <div className="py-1 px-2">
                        <div className="d-flex flex-column gap-2">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="badge-primary">
                              {request.ticketID}
                            </span>
                            <p className="mb-1">
                              {getTimeAgo(request.createdAt)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded-circle me-2"
                              src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d"
                              alt=""
                              style={{ height: "30px", width: "30px" }}
                            />
                            <span>{request.requestedBy}</span>
                          </div>
                          <h6 className="my-1 mb-2 ellipsis">{request.subject}</h6>
                          <div className="d-flex align-items-center gap-2 my-1">
                            <span
                              className={`${
                                request.status === "Pending"
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {request.status}
                            </span>
                            <span className="badge bg-danger">
                              {request.priority}
                            </span>
                            <span className="badge bg-warning text-dark">
                              {request.department}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-9 pb-3">
            <div className="d-flex flex-column gap-2">
              {selectedRequest && (
                <div
                  key={selectedRequest._id}
                  className="rounded-3 shadow-sm p-3"
                  style={{
                    height: "85vh",
                    overflow: "auto",
                    backgroundColor: !darkMode ? "black" : "white",
                    color: !darkMode ? "white" : "black",
                  }}
                >
                  <div className="task-hover-effect p-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge-primary">
                        {selectedRequest.ticketID}
                      </span>
                    </div>
                    <h5 className="text-capitalize my-2">
                      {selectedRequest.subject}
                    </h5>
                    <div className="d-flex align-items-center gap-2 my-1">
                      <span
                        className={`${
                          selectedRequest.status === "Pending"
                            ? "badge-success"
                            : "badge-danger"
                        }`}
                      >
                        {selectedRequest.status}
                      </span>
                      <span className="badge bg-danger">
                        {selectedRequest.priority}
                      </span>
                      <span className="badge bg-warning text-dark">
                        {selectedRequest.department}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle me-2"
                        src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d"
                        alt=""
                        style={{ height: "30px", width: "30px" }}
                      />
                      <div className="d-flex flex-column">
                        <span>{selectedRequest.requestedBy}</span>{" "}
                        <p className=" mb-1">
                          {getTimeAgo(selectedRequest.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-2">
                      <div
                        style={{ height: "1.8rem", width: "1.8rem" }}
                        className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                      >
                        To
                      </div>
                      <p className="m-0">{selectedRequest.to}</p>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div
                        style={{ height: "1.8rem", width: "1.8rem" }}
                        className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                      >
                        CC
                      </div>
                      <p className="m-0 ">{selectedRequest.cc.join(", ")}</p>
                    </div>

                    <div>
                      <span style={{ fontWeight: 600 }}>Request</span>
                      <p>{selectedRequest.remark}</p>
                    </div>
                    <hr />
                    {selectedRequest.reOpen?.length > 0 && (
                      <div className="mt-3">
                        <h6 style={{ fontWeight: 600 }}>Request Updates</h6>
                        {selectedRequest.reOpen.map((reopen, index) => (
                          <div
                            key={index}
                            className={`${
                              reopen.updatedBy === MyEmail
                                ? "mt-2 p-y-1 px-3 shadow-sm border rounded-3 ms-start"
                                : "mt-2 p-y-1 px-3 shadow-sm border rounded-3 ms-auto"
                            }`}
                            style={{ width: "fit-content " }}
                          >
                            <div className="d-flex flex-column">
                              <span style={{ fontWeight: 600 }}>Message</span>{" "}
                              {reopen.remark}
                            </div>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded-circle me-2"
                                src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d"
                                alt=""
                                style={{ height: "30px", width: "30px" }}
                              />
                              <div className="d-flex flex-column">
                                <span>{reopen.updatedBy}</span>{" "}
                                <p className=" mb-1">
                                  {getTimeAgo(reopen.updatedAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-start mt-3">
                      {selectedRequest.status === "Pending" ? (
                        <Button
                          variant="primary"
                          onClick={() => handleShowModal(selectedRequest)}
                        >
                          Close
                        </Button>
                      ) : selectedRequest.status === "Close" ? (
                        <Button
                          variant="secondary"
                          onClick={() => handleShowModal(selectedRequest)}
                          disabled={isCompleteButtonDisabled(
                            selectedRequest.reOpen[
                              selectedRequest.reOpen.length - 1
                            ]
                          )}
                        >
                          Reopen
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column gap-3 align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <img
            style={{ width: "20rem", height: "auto" }}
            src={RequestImage}
            alt="No Request found"
          />
          <p
            style={{
              color: darkMode
                ? "var(--primaryDashColorDark)"
                : "var(--secondaryDashMenuColor)",
            }}
          >
           There is no request found at this moment.
          </p>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Remark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="remark">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateData.remark}
                onChange={handleRemarkChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveRemark}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "Close":
      return "btn-success";
    case "Pending":
      return "btn-warning";
    default:
      return "btn-secondary";
  }
};

export default RequestRaised;
