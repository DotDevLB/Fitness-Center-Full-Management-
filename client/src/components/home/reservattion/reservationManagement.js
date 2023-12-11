import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toastContianer, toast, ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
const UserHome = () => {
  const [pitchList, setPitchList] = useState([]);
  const [selectedPitch, setSelectedPitch] = useState("");
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [overlapError, setOverlapError] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [userId, setUserId] = useState("");

  const reservationSuccess = () => {
    toast.success("Reservation Completed");
  };
  const deleteSuccess = () => {
    toast.success("Reservation Deleted");
  };

  const reservationFailure = () => {
    toast.error("Reservation Failed");
  };
  
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const handleAdditionalDetailsChange = (event) => {
    setAdditionalDetails(event.target.value);
  };

  const fetchReservationsByPitchId = async () => {
    if (selectedPitch) {
      try {
        const response = await axios.get(
          `http://localhost:8080/reservations/pitch/${selectedPitch}`
        );
        setTimes(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    }
  };
  
  useEffect(() => {
    const fetchPitchList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pitches/all");
        setPitchList(response.data);
      } catch (error) {
        console.error("Error fetching pitch list:", error);
      }
    };
    fetchPitchList();
  }, []);

  useEffect(() => {
    const fetchReservationsByPitchId = async () => {
      if (selectedPitch) {
        try {
          const response = await axios.get(
            `http://localhost:8080/reservations/pitch/${selectedPitch}`
          );
          setTimes(response.data);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      }
    };
    fetchReservationsByPitchId();
  }, [selectedPitch]);

  const handleReservationSubmit = async () => {
    const currentSystemTime = new Date();

    if (new Date(startTime) <= currentSystemTime) {
      setOverlapError("Start time must be after the current time.");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      setOverlapError("End time must be after the start time.");
      return;
    }

    const overlappingReservations = times.filter(
      (reservation) =>
        reservation.pitchId === selectedPitch &&
        ((startTime >= reservation.startTime &&
          startTime < reservation.endTime) ||
          (endTime > reservation.startTime && endTime <= reservation.endTime) ||
          (startTime <= reservation.startTime &&
            endTime >= reservation.endTime))
    );

    if (overlappingReservations.length > 0) {
      setOverlapError("Selected time overlaps with an existing reservation.");
      return;
    }

    try {
      const newReservation = {
        startTime: startTime,
        endTime: endTime,
        pitchId: selectedPitch,
        // userId: ,
        additional_details: additionalDetails,
      };

      await axios.post(
        "http://localhost:8080/reservations/save",
        newReservation
      );

      setStartTime("");
      setEndTime("");
      setAdditionalDetails("");
      setOverlapError("");
      
      reservationSuccess();
    } catch (error) {
      console.error("Error creating reservation:", error);
      reservationFailure();
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `http://localhost:8080/reservations/delete/${reservationId}`
      );
      // Fetch the updated list of reservations after deletion
      fetchReservationsByPitchId();
      deleteSuccess();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      reservationFailure();
    }
  };
  const filteredReservations = times.filter(
    (reservation) => new Date(reservation.startTime) > new Date()
  );

  return (
    <div className="container mt-5">
      <ToastContainer postiotion="top-left" />
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <style>
            {`
              .selected.card {
                border: 5px solid #007bff;
              }
            `}
          </style>

          <div className="row mt-4">
            {pitchList.map((pitch) => (
              <div key={pitch.id} className="col-md-4 mb-3">
                <div
                  className={`card ${
                    selectedPitch === pitch.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPitch(pitch.id)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{pitch.name}</h5>
                    <p className="card-text">
                      {Object.keys(pitch)
                        .filter(
                          (key) =>
                            key !== "id" &&
                            key !== "latitude" &&
                            key !== "longitude"
                        )
                        .map((key) => (
                          <span key={key}>
                            {`${key}: ${pitch[key]}`}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedPitch && (
            <div className="mt-5">
              <h3>Upcoming Reservations for Selected Pitch</h3>
              {filteredReservations.length === 0 ? (
                <p>No upcoming reservations for this pitch.</p>
              ) : (
                <ul className="list-group">
                  {filteredReservations.map((reservation) => (
                    <li
                      key={reservation.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <p>
                          <br />
                          <strong>Start Time:</strong>{" "}
                          {moment(reservation.startTime).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                          <br />
                          <strong>End Time:</strong>{" "}
                          {moment(reservation.endTime).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteReservation(reservation.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {selectedPitch && (
            <div className="mt-5">
              <h3>Add Reservation</h3>
          
              <div className="mb-3">
                <label htmlFor="startTimeInput" className="form-label">
                  Start Time:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="startTimeInput"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endTimeInput" className="form-label">
                  End Time:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="endTimeInput"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="additionalDetailsInput" className="form-label">
                  Additional Details:
                </label>
                <textarea
                  className="form-control"
                  id="additionalDetailsInput"
                  value={additionalDetails}
                  onChange={handleAdditionalDetailsChange}
                  rows={4}
                ></textarea>
              </div>
              {overlapError && <p className="text-danger">{overlapError}</p>}
              <button
                onClick={handleReservationSubmit}
                className="btn btn-primary"
              >
                Add Reservation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    
  );
};

export default UserHome;
