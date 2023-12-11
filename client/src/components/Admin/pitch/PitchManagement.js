import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PitchManagement.css"; // Your custom CSS file if needed
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PlaceIcon from "@mui/icons-material/Place";

const apiKey = "dda740db6b0d79b6dd3a695593eede9d";


const PitchForm = () => {
  const [pitchList, setPitchList] = useState([]);

  useEffect(() => {
    // Fetch pitch list from your API endpoint
    const fetchPitchList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pitches/all"); // Replace '/api/pitches' with your actual API endpoint
        setPitchList(response.data); // Assuming the response data is an array of pitches
      } catch (error) {
        console.error("Error fetching pitch list:", error);
      }
    };

    fetchPitchList();
  }, []);

  const [pitch, setPitch] = useState({
    name: "",
    description: "",
    costPerHour: "",
    maxPlayers: "",
    surfaceType: "",
    sizeInSquareMeters: "",
    longitude: "",
    latitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPitch({ ...pitch, [name]: value });
  };

  const [newPlace, setNewPlace] = React.useState(null);
  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let lon = e.lngLat.lng;

    setNewPlace({
      lat: lat,
      lng: lon,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/pitches/save", {
        ...pitch,
        longitude: newPlace.lng,
        latitude: newPlace.lat,
      });
      console.log("Pitch Data submitted:", response.data);
      const newPitchList = [...pitchList, response.data];
      setPitchList(newPitchList);
      setPitch({
        name: "",
        description: "",
        costPerHour: "",
        maxPlayers: "",
        surfaceType: "",
        sizeInSquareMeters: "",
        longitude: "",
        latitude: "",
      });
    } catch (error) {
      console.error("Error submitting pitch data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pitches/delete/${id}`);
      const updatedPitchList = pitchList.filter((pitch) => pitch.id !== id);
      setPitchList(updatedPitchList);
      console.log(`Pitch with ID ${id} deleted`);
    } catch (error) {
      console.error("Error deleting pitch:", error);
    }
  };
  const [editPitchId, setEditPitchId] = useState(null);
  const handleEdit = (id) => {
    setEditPitchId(id);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedPitch = pitchList.find((pitch) => pitch.id === id);
      await axios.put(
        `http://localhost:8080/pitches/update/${id}`,
        updatedPitch
      );
      setEditPitchId(null);
      console.log(`Pitch with ID ${id} updated`);
    } catch (error) {
      console.error("Error updating pitch:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pitch Form</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Location"
            name="name"
            value={pitch.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={pitch.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="costPerHour" className="form-label">
            Cost Per Hour:
          </label>
          <input
            type="number"
            className="form-control"
            id="costPerHour"
            placeholder="Enter cost per hour"
            name="costPerHour"
            value={pitch.costPerHour}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="maxPlayers" className="form-label">
            Max Players:
          </label>
          <input
            type="number"
            className="form-control"
            id="maxPlayers"
            placeholder="Enter max players"
            name="maxPlayers"
            value={pitch.maxPlayers}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="surfaceType" className="form-label">
            Surface Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="surfaceType"
            placeholder="Enter surface type"
            name="surfaceType"
            value={pitch.surfaceType}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sizeInSquareMeters" className="form-label">
            Size in Square Meters:
          </label>
          <input
            type="number"
            className="form-control"
            id="sizeInSquareMeters"
            placeholder="Enter size in square meters"
            name="sizeInSquareMeters"
            value={pitch.sizeInSquareMeters}
            onChange={handleChange}
          />
        </div>
        
        <Map
  container={"map"}
  projection={"globe"}
  mapboxAccessToken={
    "pk.eyJ1Ijoiam9lLWhhZGNoaXR5IiwiYSI6ImNsb3ptNG10djAyNmoya28zYzRtMHVla3QifQ.KTXfLu--3Q8ryr0DYWkEmg"
  }
  mapStyle="mapbox://styles/joe-hadchity/clozm9s84001i01qtgs718ugj"
  style={{ width: "82vw", height: "50vh" }}
  onDblClick={handleAddClick}
>
  {pitchList.map((p) => (
    <Marker
      key={p.id}
      longitude={parseFloat(p.longitude)}
      latitude={parseFloat(p.latitude)}
      anchor="center"
    >
      <PlaceIcon />
    </Marker>
  ))}
  {newPlace && (
    <Marker
      key="newPlace"
      longitude={newPlace.lng}
      latitude={newPlace.lat}
      anchor="center"
    >
      <PlaceIcon style={{ color: "#3498db", fontSize: "26px", cursor: "pointer" }} />
    </Marker>
  )}
</Map>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h2>Pitch List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Cost Per Hour</th>
            <th>Max Players</th>
            <th>Surface Type</th>
            <th>Size in Square Meters</th>
            <th>Longitude</th>
            <th>Latitude</th>
          </tr>
        </thead>
        <tbody>
          {pitchList.map((pitch) => (
            <tr key={pitch.id}>
              {editPitchId === pitch.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={pitch.name}
                      onChange={(e) => handleChange(e, "name", pitch.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={pitch.description}
                      onChange={(e) => handleChange(e, "description", pitch.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={pitch.costPerHour}
                      onChange={(e) => handleChange(e, "costPerHour", pitch.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={pitch.maxPlayers}
                      onChange={(e) => handleChange(e, "maxPlayers", pitch.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={pitch.surfaceType}
                      onChange={(e) => handleChange(e, "surfaceType", pitch.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={pitch.sizeInSquareMeters}
                      onChange={(e) =>
                        handleChange(e, "sizeInSquareMeters", pitch.id)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={pitch.longitude}
                      onChange={(e) => handleChange(e, "longitude", pitch.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={pitch.latitude}
                      onChange={(e) => handleChange(e, "latitude", pitch.id)}
                    />
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Pitch Edit Actions"
                    >
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleUpdate(pitch.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditPitchId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{pitch.name}</td>
                  <td>{pitch.description}</td>
                  <td>{pitch.costPerHour}</td>
                  <td>{pitch.maxPlayers}</td>
                  <td>{pitch.surfaceType}</td>
                  <td>{pitch.sizeInSquareMeters}</td>
                  <td>{pitch.longitude}</td>
                  <td>{pitch.latitude}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Pitch Actions"
                    >
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setEditPitchId(pitch.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(pitch.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PitchForm;
