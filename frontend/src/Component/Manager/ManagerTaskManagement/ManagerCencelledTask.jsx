import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../Pages/config/config";
const ManagerCencelledTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tasks`, {
        params: { status: "Cancelled" }
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching cancelled tasks:", error.message);
      setError("Error fetching cancelled tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataWithTimeout = async () => {
      await fetchData();
    };

    fetchDataWithTimeout();
  }, []);

  return (
    <div className="p-4">
      <h1 className="fs-2 text-muted fw-bolder text-uppercase">
        ❌ Cancelled Task
      </h1>
      <p className="text-muted">You can view all Cancelled task here!</p>{" "}
      {loading && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="d-flex aline-center gap-2"
        >
          <div
            className="spinner-grow bg-primary"
            style={{ width: "1rem", height: "1rem" }}
            role="status"
          ></div>

          <span className="text-primary fw-bold">Loading...</span>
        </div>
      )}
      <div
        style={{
          overflowY: "scroll",
          height: "80vh",
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          scrollMargin: "1rem"
        }}
      >
        {tasks
          .filter((task) => task.status === "Cancelled")
          .map((task, index) => (
            <details
              style={{
                boxShadow: "-1px 1px 10px gray"
              }}
              className="p-1 position-relative mt-3 fs-4 rounded mx-3"
              key={task.id}
            >
              <summary
                style={{
                  height: "fit-content",
                  background:
                    "linear-gradient(165deg,#11009E, #700B97, 90%, #C84B31)"
                }}
                className="d-flex justify-content-between aline-center form-control text-white"
              >
                <div className="fw-bold fs-5 d-flex justify-content-center flex-column">
                  # Task {index + 1} : {task.Taskname}
                </div>
                <div
                  style={{ position: "absolute", top: "-10px", left: "20px" }}
                  className="fw-bold bg-white rounded-5 px-3 text-danger fs-6 d-flex justify-content-center aline-center flex-column"
                >
                  {task.department}
                </div>
                <div className="">
                  <p className="btn btn-danger m-auto fw-bold">Cancelled</p>
                </div>
              </summary>
              <div
                style={{ position: "relative" }}
                className="row p-1 my-2 mx-0 bg-light text-dark rounded"
              >
                <div
                  style={{
                    width: "99.4%",
                    height: "100%",
                    zIndex: "5",
                    backgroundColor: "rgba(128, 128, 128, 0.422)",
                    textShadow: "-5px 5px 5px rgba(128, 128, 128, 0.422)"
                  }}
                  className="watermark form-control position-absolute d-flex justify-content-center aline-center"
                >
                  <h1 className="text-uppercase text-light fw-bolder">
                    c a n c e l l e d
                  </h1>
                </div>
                <div style={{ height: "fit-content" }} className="form-control">
                  <div
                    style={{ position: "relative" }}
                    className="row p-1 my-2 mx-0 bg-light text-dark rounded"
                  >
                    <div
                      style={{
                        width: "99.4%",
                        height: "100%",
                        zIndex: "5",
                        backgroundColor: "rgba(128, 128, 128, 0.422)",
                        textShadow: "-5px 5px 5px rgba(128, 128, 128, 0.422)"
                      }}
                      className="watermark form-control   position-absolute d-flex justify-content-center aline-center"
                    >
                      <h1 className="text-uppercase text-light fw-bolder">
                        c a n c e l l e d
                      </h1>
                    </div>
                    <div
                      style={{ height: "fit-content" }}
                      className="form-control"
                    >
                      <p
                        style={{ height: "fit-content" }}
                        className="text-start fs-6 form-control"
                      >
                        <h6 className="fw-bold">Task Discription</h6>{" "}
                        {task.description}
                      </p>
                      <div
                        style={{ height: "fit-content" }}
                        className="row form-control d-flex pt-3 rounded mx-1 justify-content-between"
                      >
                        <p
                          style={{ fontSize: "1rem" }}
                          className="col-6 col-sm-6 col-md-2"
                        >
                          Task Durations <br />{" "}
                          <span>{task.duration} days</span>{" "}
                        </p>
                        <p
                          style={{ fontSize: "1rem" }}
                          className="col-6 col-sm-6 col-md-2"
                        >
                          Created By <br /> <span> {task.managerEmail}</span>
                        </p>
                        <p
                          style={{ fontSize: "1rem" }}
                          className="col-6 col-sm-6 col-md-2"
                        >
                          Start Date <br />{" "}
                          <span>
                            {new Date(task.startDate).toLocaleDateString()}
                          </span>
                        </p>
                        <p
                          style={{ fontSize: "1rem" }}
                          className="col-6 col-sm-6 col-md-2"
                        >
                          End Date <br />{" "}
                          <span>
                            {new Date(task.endDate).toLocaleDateString()}
                          </span>
                        </p>
                        <p
                          style={{ fontSize: "1rem" }}
                          className="col-6 col-sm-6 col-md-2"
                        >
                          <span>
                            Task Status <br /> {task.status}
                          </span>
                        </p>
                      </div>
                      <div
                        style={{ height: "fit-content" }}
                        className="row form-control d-flex pt-3 rounded mx-1 justify-content-between"
                      >
                        <p>
                          <span className="fw-bold">Remarks : </span>{" "}
                          {task.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          ))}
      </div>
    </div>
  );
};

export default ManagerCencelledTask;
