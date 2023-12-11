import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./base.js";
import { AuthContext } from "./Auth";
import { toastContianer, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PlaceIcon from "@mui/icons-material/Place";

const UserHome = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [pitchList, setPitchList] = useState([]);
  const [selectedPitch, setSelectedPitch] = useState("");
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [overlapError, setOverlapError] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
 

  const reservationSuccess = () => {
    toast.success("Reservation Completed");
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
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const handleDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
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
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
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
        userId: currentUser ? currentUser.id : null,
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
      setSelectedTimeSlots([]);
      reservationSuccess();
    } catch (error) {
      console.error("Error creating reservation:", error);
      reservationFailure();
    }
  };

  const filteredReservations = times.filter(
    (reservation) => new Date(reservation.startTime) > new Date()
  );

  const generateTimeSlots = (startTime, endTime, intervalInMinutes) => {
    const timeSlots = [];
    let currentTime = moment(startTime);

    while (currentTime.isBefore(moment(endTime))) {
      timeSlots.push(currentTime.format("HH:mm"));
      currentTime.add(intervalInMinutes, 'minutes');
    }

    return timeSlots;
  };

  const handleTimeSlotSelection = (timeSlot) => {
    const updatedSelectedTimeSlots = [...selectedTimeSlots];

    if (updatedSelectedTimeSlots.includes(timeSlot)) {
      updatedSelectedTimeSlots.splice(
        updatedSelectedTimeSlots.indexOf(timeSlot),
        1
      );
    } else {
      updatedSelectedTimeSlots.push(timeSlot);
    }

    setSelectedTimeSlots(updatedSelectedTimeSlots);
  };
  return (
    <div className="container mt-5">
      <ToastContainer position="top-left" />
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h1 className="mb-4">Welcome to the User Home Page</h1>

          <style>
            {`
              .selected.card {
                border: 5px solid #007bff;
              }
            `}
          </style>

          <Map
            container={"map"}
            projection={"globe"}
            mapboxAccessToken={
              "pk.eyJ1Ijoiam9lLWhhZGNoaXR5IiwiYSI6ImNsb3ptNG10djAyNmoya28zYzRtMHVla3QifQ.KTXfLu--3Q8ryr0DYWkEmg"
            }
            mapStyle="mapbox://styles/joe-hadchity/clozm9s84001i01qtgs718ugj"
            style={{ width: "82vw", height: "50vh" }}
          >
            {pitchList.map((p) => (
              <Marker
                key={p.id}
                longitude={parseFloat(p.longitude)}
                latitude={parseFloat(p.latitude)}
                anchor="center"
              >
                 <PlaceIcon
                style={{
                  color: selectedPitch === p.id ? "red" : "slateblue",
                  fontSize: selectedPitch === p.id ? "30px" : "24px",
                  opacity: selectedPitch=== p.id ? 1 : 0.7,
                  transform: selectedPitch === p.id ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.3s ease-out",
                }}/>
              </Marker>
            ))}

           
            
          </Map>
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
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleDirections(pitch.latitude, pitch.longitude)
                      }
                    >
                      <DirectionsIcon />
                      Directions
                    </button>
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
               {/* <h3>Select Time Slots</h3>
            <div className="mb-3">
              {generateTimeSlots(startTime, endTime, 30).map((slot) => (
                <button
                  key={slot}
                  className={`btn btn-outline-primary ${
                    selectedTimeSlots.includes(slot) ? 'selected' : ''
                  }`}
                  onClick={() => handleTimeSlotSelection(slot)}
                >
                  {slot}
                </button>
              ))}
            </div> */}
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
          <button onClick={handleSignOut} className="btn btn-danger mt-3">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
