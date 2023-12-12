import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const ManagementComponent = () => {
  // Team state
  const [teams, setTeams] = useState([]);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    description: '',
    league_id:'',
  });

  // Player state
  const [players, setPlayers] = useState([]);
  const [playerFormData, setPlayerFormData] = useState({
    name: '',
    team_id: 0,
  });

  // League state
  const [leagues, setLeagues] = useState([]);
  const [leagueFormData, setLeagueFormData] = useState({
    season: '',
    description: '',
  });

  // Edit state
  const [editItemId, setEditItemId] = useState(null);

  // Fetch teams, players, and leagues when component mounts
  useEffect(() => {
    fetchTeams();
    fetchPlayers();
    fetchLeagues();
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

  const getTeamName = (teamId) => {
    const selectedTeam = teams.find(team => team.id === teamId);
    return selectedTeam ? selectedTeam.name : 'Unknown Team';
  }

  // Fetch players
  const fetchPlayers = () => {
    axios.get('http://localhost:8080/Players')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
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

  // Handle team form input change
  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData({ ...teamFormData, [name]: value });
  };

  // Handle player form input change
  const handlePlayerInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerFormData({ ...playerFormData, [name]: value });
  };

  // Handle league form input change
  const handleLeagueInputChange = (e) => {
    const { name, value } = e.target;
    setLeagueFormData({ ...leagueFormData, [name]: value });
  };

  // Handle team form submission
  const handleTeamSubmit = (e) => {
    e.preventDefault();

    if (editItemId) {
      // If editing, send a PUT request
      axios.put(`http://localhost:8080/teams/update/${editItemId}`, teamFormData)
        .then(response => {
          // Refresh the team list after editing a team
          fetchTeams();
          // Clear the form and reset edit state
          setTeamFormData({ name: '', description: '' });
          setEditItemId(null);
        })
        .catch(error => {
          console.error('Error updating team:', error);
        });
    } else {
      // If not editing, send a POST request
      axios.post('http://localhost:8080/teams/save', teamFormData)
        .then(response => {
          // Refresh the team list after adding a new team
          fetchTeams();
          // Clear the form
          setTeamFormData({ name: '', description: '' });
        })
        .catch(error => {
          console.error('Error saving team:', error);
        });
    }
  };

  // Handle player form submission
  const handlePlayerSubmit = (e) => {
    e.preventDefault();

    if (editItemId) {
      // If editing, send a PUT request
      axios.put(`http://localhost:8080/Players/update/${editItemId}`, playerFormData)
        .then(response => {
          // Refresh the player list after editing a player
          fetchPlayers();
          // Clear the form and reset edit state
          setPlayerFormData({ name: '', team_id: 0 });
          setEditItemId(null);
        })
        .catch(error => {
          console.error('Error updating player:', error);
        });
    } else {
      // If not editing, send a POST request
      axios.post('http://localhost:8080/Players/save', playerFormData)
        .then(response => {
          // Refresh the player list after adding a new player
          fetchPlayers();
          // Clear the form
          setPlayerFormData({ name: '', team_id: 0 });
        })
        .catch(error => {
          console.error('Error saving player:', error);
        });
    }
  };

  // Handle league form submission
  const handleLeagueSubmit = (e) => {
    e.preventDefault();

    if (editItemId) {
      // If editing, send a PUT request
      axios.put(`http://localhost:8080/Leagues/update/${editItemId}`, leagueFormData)
        .then(response => {
          // Refresh the league list after editing a league
          fetchLeagues();
          // Clear the form and reset edit state
          setLeagueFormData({ season: '', description: '' });
          setEditItemId(null);
        })
        .catch(error => {
          console.error('Error updating league:', error);
        });
    } else {
      // If not editing, send a POST request
      axios.post('http://localhost:8080/Leagues/save', leagueFormData)
        .then(response => {
          // Refresh the league list after adding a new league
          fetchLeagues();
          // Clear the form
          setLeagueFormData({ season: '', description: '' });
        })
        .catch(error => {
          console.error('Error saving league:', error);
        });
    }
  };

  // Function to handle team deletion
  const handleDeleteTeam = (teamId) => {
    axios.delete(`http://localhost:8080/teams/delete/${teamId}`)
      .then(response => {
        // Refresh the team list after deleting a team
        fetchTeams();
      })
      .catch(error => {
        console.error('Error deleting team:', error);
      });
  };

  // Function to handle player deletion
  const handleDeletePlayer = (playerId) => {
    axios.delete(`http://localhost:8080/Players/delete/${playerId}`)
      .then(response => {
        // Refresh the player list after deleting a player
        fetchPlayers();
      })
      .catch(error => {
        console.error('Error deleting player:', error);
      });
  };

  // Function to handle league deletion
  const handleDeleteLeague = (leagueId) => {
    axios.delete(`http://localhost:8080/Leagues/delete/${leagueId}`)
      .then(response => {
        // Refresh the league list after deleting a league
        fetchLeagues();
      })
      .catch(error => {
        console.error('Error deleting league:', error);
      });
  };
  
  // Function to handle league editing
  const handleEditLeague = (leagueId) => {
    // Find the league with the given ID
    const editedLeague = leagues.find(league => league.id === leagueId);
    if (editedLeague) {
      // Set the form data with the existing values
      setLeagueFormData({
        season: editedLeague.season,
        description: editedLeague.description,
      });
      // Set the edit item ID
      setEditItemId(leagueId);
    }
  };
  

  // Function to handle team editing
  const handleEditTeam = (teamId) => {
    // Find the team with the given ID
    const editedTeam = teams.find(team => team.id === teamId);
    if (editedTeam) {
      // Set the form data with the existing values
      setTeamFormData({
        name: editedTeam.name,
        description: editedTeam.description,
      });
      // Set the edit item ID
      setEditItemId(teamId);
    }
  };
  const getTeamLeague = (teamId) => {
    const selectedTeam = teams.find(team => team.id === teamId);
    if (selectedTeam) {
      const associatedLeague = leagues.find(league => league.id === selectedTeam.league_id);
      return associatedLeague ? ` - ${associatedLeague.season} - ${associatedLeague.description}` : '';
    }
    return '';
  };
  // Function to handle player editing
  const handleEditPlayer = (playerId) => {
    // Find the player with the given ID
    const editedPlayer = players.find(player => player.id === playerId);
    if (editedPlayer) {
      // Set the form data with the existing values
      setPlayerFormData({
        name: editedPlayer.name,
        team_id: editedPlayer.team_id,
      });
      // Set the edit item ID
      setEditItemId(playerId);
    }
  };

  // Function to handle league editing

  return (
    <div className="container mt-4">
      <h2>Management</h2>
      <Link to="/homeAdmin/MakeMatch">
            <button className="btn btn-primary btn-lg">Make Match</button>
          </Link>
          <Link to="/homeAdmin/TheLeagues">
            <button className="btn btn-primary btn-lg">TheLeagues</button>
          </Link>
      <form onSubmit={handleLeagueSubmit}>
        <div className="mb-3">
          <label htmlFor="season" className="form-label">Season</label>
          <input
            type="text"
            className="form-control"
            id="season"
            name="season"
            value={leagueFormData.season}
            onChange={handleLeagueInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">League description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={leagueFormData.description}
            onChange={handleLeagueInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editItemId ? 'Edit League' : 'Add League'}
        </button>
      </form>
      {/* Team Form */}
      <form onSubmit={handleTeamSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Team Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        value={teamFormData.name}
        onChange={handleTeamInputChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Team description</label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        value={teamFormData.description}
        onChange={handleTeamInputChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="league_id" className="form-label">Select League</label>
      <select
        className="form-select"
        id="league_id"
        name="league_id"
        value={teamFormData.league_id}
        onChange={handleTeamInputChange}
        required
      >
        <option value="">Select League</option>
        {leagues.map(league => (
          <option key={league.id} value={league.id}>
            {league.season} - {league.description}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" className="btn btn-primary">
      {editItemId ? 'Edit Team' : 'Add Team'}
    </button>
  </form>

      {/* Team List */}
      <div className="mt-4">
        <h3>Team List</h3>
        <ul className="list-group">
          {teams.map(team => (
            <li key={team.id} className="list-group-item">
              <strong>{team.name}</strong>: {team.description}
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleDeleteTeam(team.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary ms-2"
                onClick={() => handleEditTeam(team.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Player Form */}
      <form onSubmit={handlePlayerSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Player Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={playerFormData.name}
            onChange={handlePlayerInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="team_id" className="form-label">Select Team</label>
          <select
            className="form-select"
            id="team_id"
            name="team_id"
            value={playerFormData.team_id}
            onChange={handlePlayerInputChange}
            required
          >
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                 {team.name} - {getTeamLeague(team.id)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editItemId ? 'Edit Player' : 'Add Player'}
        </button>
      </form>

      {/* Player List */}
      <div className="mt-4">
        <h3>Player List</h3>
        <ul className="list-group">
          {players.map(player => (
            <li key={player.id} className="list-group-item">
              <strong>{player.name}</strong> - Team: {getTeamName(player.team_id)}
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleDeletePlayer(player.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary ms-2"
                onClick={() => handleEditPlayer(player.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* League Form */}


      {/* League List */}
      <div className="mt-4">
  <h3>League List</h3>
  <ul className="list-group">
    {leagues.map(league => (
      <li key={league.id} className="list-group-item">
       <strong>Season:</strong> {league.season}<br />
        <strong>description:</strong> {league.description}
        <button
          className="btn btn-danger ms-2"
          onClick={() => handleDeleteLeague(league.id)}
        >
          Delete
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={() => handleEditLeague(league.id)}
        >
          Edit
        </button>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default ManagementComponent;
