import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as html2pdf from 'html2pdf.js';

const Result = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Leagues');
        const leaguesWithTeams = await Promise.all(
          response.data.map(async (league) => {
            try {
              const teamResponse = await axios.get(`http://localhost:8080/teams/getWinner/${league.id}`);
              const winnerTeam = teamResponse.data; // Assuming the winner is returned directly as a TeamDTO

              // Fetch players for each team
              const playersResponse = await axios.get(`http://localhost:8080/Players/team/${winnerTeam.id}`);
              const players = playersResponse.data;
              
              return {
                ...league,
                winner: winnerTeam,
                teams: winnerTeam ? [{ ...winnerTeam, players }] : [], // Include players in the team
              };
            } catch (error) {
              console.error(`Error fetching winner team and players for league ${league.id}:`, error);
              return league;
            }
          })
        );
        setLeagues(leaguesWithTeams);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  const downloadPDF = (league) => {
    const content = document.getElementById(`pdf-content-${league.id}`);
    const button = content.querySelector('.btn-primary');
    button.style.display = 'none'; // Hide the button before creating the PDF

    html2pdf().from(content).save(`League_${league.id}_Report.pdf`);

    button.style.display = 'block'; // Show the button again after creating the PDF
  };

  return (
    <div className="container mt-5">
      {leagues.map((league) => (
        <div key={league.id} className="mb-4" id={`pdf-content-${league.id}`}>
          <h2>
            {league.winner ? (
              <span>Winner: {league.winner.name}</span>
            ) : (
              <span>No winner yet</span>
            )}
          </h2>
          <h3>League Name: {league.description}</h3>
          <p>{league.season}</p>
          <div>
            {league.teams.map((team) => (
              <div key={team.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Team Name: {team.name}</h5>
                  <p className="card-text">Description: {team.description}</p>
                  <p className="card-text">Score: {team.score}</p>
                  <p>You have won $1000</p>

                  {/* Display Players */}
                  <h6>Players:</h6>
                  <ul>
                    {team.players.map((player) => (
                      <li key={player.id}>{player.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => downloadPDF(league)}>
            CONGRATSSSSSSSSSSS
          </button>
        </div>
      ))}
    </div>
  );
};

export default Result;
