package com.fitnesscenter.server.service;

import com.fitnesscenter.server.models.ReservationDTO;
import com.fitnesscenter.server.models.TeamDTO;
import com.fitnesscenter.server.repository.TeamRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

   



    @Autowired
    private  TeamRepository TeamRepository;

    
    public TeamService(TeamRepository TeamRepository) {
        this.TeamRepository = TeamRepository;
    }
//   public List<TeamDTO> getTeamsByLeague(int league_id) {
//         return TeamRepository.findByLeagueId(league_id);
//     }

    public List<TeamDTO> getAllTeams() {
        return TeamRepository.findAll();
    }
    public List<TeamDTO> getTeamsByLeagueId(int leagueId) {
        return TeamRepository.findByLeagueId(leagueId);
    }
        public TeamDTO getTeamWithMaxScoreByLeagueId(int leagueId) {
        List<TeamDTO> teams = TeamRepository.findByLeagueId(leagueId);

        int maxScore = 0;
            TeamDTO winner=null;
        for (TeamDTO team : teams) {
            if (team.getScore() > maxScore) {
                maxScore = team.getScore();
                
            }
            
        }
 for (TeamDTO team : teams) {
            if (team.getScore() == maxScore) {
                
                winner=team;
            }
            
        }

        return winner;
    }
    public List<TeamDTO> getTeamsByLeague(int leagueId) {
        return TeamRepository.findByLeagueId(leagueId);
    }
    
   

    public Optional<TeamDTO> getTeamById(int id) {
        return TeamRepository.findById(id);
    }

    public int getLeagueIdForTeam(int teamId) {
        TeamDTO team = TeamRepository.findById(teamId).orElse(null);
       
            return team.getLeague_id();
    }
    

    public TeamDTO createTeam(TeamDTO Team) {
        return TeamRepository.save(Team);
    }

    public TeamDTO updateTeam(TeamDTO Team) {
        return TeamRepository.save(Team);
    }

    public void deleteTeamById(int id) {
        TeamRepository.deleteById(id);
    }
   
}
