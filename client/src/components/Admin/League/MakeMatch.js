// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchForm = () => {
  // State for form data
  const [matchFormData, setMatchFormData] = useState({
    team_id1: 0,
    team_id2: 0,
    score_team_id1: 0,
    score_team_id2: 0,
    league_id: '',
    pitch_id: '',
    reservation_id: '',
  });

  // Dropdown options state
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Fetch dropdown options when the component mounts
  useEffect(() => {
    fetchTeams();
    fetchLeagues();
    fetchPitches();
    fetchReservations();
  }, []);

  // Fetch teams
  const fetchTeams = () => {
    axios.get('http://localhost:8080/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  };

  // Fetch leagues
  const fetchLeagues = () => {
    axios.get('http://localhost:8080/Leagues')
      .then(response => {
        setLeagues(response.data);
      })
      .catch(error => {
        console.error('Error fetching leagues:', error);
      });
  };

  // Fetch pitches
  const fetchPitches = () => {
    axios.get('http://localhost:8080/pitches/all')
      .then(response => {
        setPitches(response.data);
      })
      .catch(error => {
        console.error('Error fetching pitches:', error);
      });
  };

  // Fetch reservations
  const fetchReservations = () => {
    axios.get('http://localhost:8080/reservations/all')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatchFormData({ ...matchFormData, [name]: value });
  };

  // Function to get league ID for a team
  const getLeagueIdForTeam = async (teamId) => {
    try {
      const response = await axios.get(`http://localhost:8080/teams/getLeague/${teamId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching league ID for team ${teamId}:`, error);
      throw error;
    }
  };

  // Function to check if reservation exists
  const checkReservationExists = async (reservationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/matches/checkReservation/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error checking reservation existence:`, error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matchFormData.team_id1 === matchFormData.team_id2) {
      alert("Teams should be different!");
      return;
    }

    try {
      // Check if reservation exists
      const reservationExists = await checkReservationExists(matchFormData.reservation_id);

      if (reservationExists) {
        alert("Reservation already exists!");
      } else {
        // Determine the winning team and update scores accordingly
        const winningTeamId = matchFormData.score_team_id1 > matchFormData.score_team_id2
          ? matchFormData.team_id1
          : matchFormData.score_team_id1 < matchFormData.score_team_id2
            ? matchFormData.team_id2
            : null;

        // Check if scores are the same
        const scoresAreEqual = matchFormData.score_team_id1 === matchFormData.score_team_id2;

        // Update the winning team's score
        if (winningTeamId !== null) {
          try {
            await axios.put(`http://localhost:8080/teams/updateScore/${winningTeamId}`);
            // Handle success, if needed
          } catch (error) {
            console.error('Error updating team score:', error);
          }
        }

        // If scores are equal, add 1 point to each team's score
        if (scoresAreEqual) {
          try {
            await axios.put(`http://localhost:8080/teams/updateScoredraw/${matchFormData.team_id1}`, { increment: 1 });
            // Handle success, if needed
          } catch (error) {
            console.error('Error updating team score:', error);
          }

          try {
            await axios.put(`http://localhost:8080/teams/updateScoredraw/${matchFormData.team_id2}`, { increment: 1 });
            // Handle success, if needed
          } catch (error) {
            console.error('Error updating team score:', error);
          }
        }

        // Send a POST request to save the new match
        try {
          const response = await axios.post('http://localhost:8080/matches/save', matchFormData);
          // Handle success, if needed
          console.log(response.data);
        } catch (error) {
          console.error('Error saving match:', error);
        }
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Match</h2>

      {/* Match Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="league_id" className="form-label">League</label>
          <select
            className="form-select"
            id="league_id"
            name="league_id"
            value={matchFormData.league_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select League</option>
            {leagues.map(league => (
              <option key={league.id} value={league.id}>
                {league.season}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="team_id1" className="form-label">Team 1</label>
          <select
            className="form-select"
            id="team_id1"
            name="team_id1"
            value={matchFormData.team_id1}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Team 1</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="team_id2" className="form-label">Team 2</label>
          <select
            className="form-select"
            id="team_id2"
            name="team_id2"
            value={matchFormData.team_id2}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Team 2</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="score_team_id1" className="form-label">Score Team 1</label>
          <input
            type="number"
            className="form-control"
            id="score_team_id1"
            name="score_team_id1"
            value={matchFormData.score_team_id1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="score_team_id2" className="form-label">Score Team 2</label>
          <input
            type="number"
            className="form-control"
            id="score_team_id2"
            name="score_team_id2"
            value={matchFormData.score_team_id2}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pitch_id" className="form-label">Pitch</label>
          <select
            className="form-select"
            id="pitch_id"
            name="pitch_id"
            value={matchFormData.pitch_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Pitch</option>
            {pitches.map(pitch => (
              <option key={pitch.id} value={pitch.id}>
                {pitch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="reservation_id" className="form-label">Reservation</label>
          <select
            className="form-select"
            id="reservation_id"
            name="reservation_id"
            value={matchFormData.reservation_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Reservation</option>
            {reservations.map(reservation => (
              <option key={reservation.id} value={reservation.id}>
                {reservation.endTime}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Match
        </button>
      </form>
    </div>
  );
};

export default MatchForm;
