import React, { useState, useEffect } from 'react';

const ViewMacthes = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch matches from your API endpoint
    fetch('/matches')
      .then(response => response.json())
      .then(data => setMatches(data))
      .catch(error => console.error('Error fetching matches:', error));
  }, []); // Empty dependency array ensures the effect runs once on component mount

  // Function to fetch team names by team ID
  const getTeamName = async (teamId) => {
    const response = await fetch(`/teams/${teamId}`);
    const team = await response.json();
    return team.name;
  };

  // Function to fetch team names for all matches
  const getTeamNamesForMatches = async () => {
    const updatedMatches = await Promise.all(
      matches.map(async match => ({
        ...match,
        team1Name: await getTeamName(match.team_id1),
        team2Name: await getTeamName(match.team_id2),
      }))
    );

    setMatches(updatedMatches);
  };

  useEffect(() => {
    getTeamNamesForMatches();
  }, [matches]); // Re-run when matches change

  return (
    <div>
      <h2>Matches List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Score Team 1</th>
            <th>Score Team 2</th>
            <th>Reservation ID</th>
            <th>Pitch ID</th>
            <th>League ID</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.team1Name}</td>
              <td>{match.team2Name}</td>
              <td>{match.score_team_id1}</td>
              <td>{match.score_team_id2}</td>
              <td>{match.reservation_id}</td>
              <td>{match.pitch_id}</td>
              <td>{match.league_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMacthes;
