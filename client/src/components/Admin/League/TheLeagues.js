import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const TheLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState({});

  const fetchLeagues = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Leagues');
      const leaguesWithTeams = await Promise.all(
        response.data.map(async (league) => {
          const teamResponse = await axios.get(`http://localhost:8080/teams/byLeague/${league.id}`);

          return {
            ...league,
            teams: teamResponse.data,
          };
        })
      );
      setLeagues(leaguesWithTeams);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const handleViewPlayers = async (teamId) => {
    try {
      const response = await axios.get(`http://localhost:8080/Players/team/${teamId}`);
      setSelectedTeamPlayers({
        ...selectedTeamPlayers,
        [teamId]: response.data,
      });
      setSelectedTeamId((prevTeamId) => (prevTeamId === teamId ? null : teamId));
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/homeAdmin/result">
        <button className="btn btn-primary btn-lg">Results</button>
      </Link>
     

      {leagues.map((league) => (
        <div key={league.id} className="mb-4">
          <h2>League Name: {league.description}</h2>
          <p>{league.season}</p>
          <div>
            {league.teams.map((team) => (
              <div key={team.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Team Name: {team.name}</h5>
                  <p className="card-text">Description: {team.description}</p>
                  <p className="card-text">Score: {team.score}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewPlayers(team.id)}
                  >
                    {selectedTeamId === team.id ? 'Hide Players' : 'View Players'}
                  </button>
                  {selectedTeamId === team.id && (
                    <div>
                      <h5>Players:</h5>
                      <ul>
                        {selectedTeamPlayers[team.id]?.map((player) => (
                          <li key={player.id}>{player.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheLeagues;
