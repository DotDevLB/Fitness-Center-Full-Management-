package com.fitnesscenter.server.controller;

import com.fitnesscenter.server.models.ReservationDTO;
import com.fitnesscenter.server.models.TeamDTO;
import com.fitnesscenter.server.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teams")
public class TeamController {

     @Autowired
    private  TeamService TeamService;


    @PostMapping("/save")
public ResponseEntity<TeamDTO> addTeam(@RequestBody TeamDTO Team) {
    TeamDTO createdTeam = TeamService.createTeam(Team);
    return new ResponseEntity<>(createdTeam, HttpStatus.CREATED);
}


    @GetMapping
    public ResponseEntity<List<TeamDTO>> getAllTeams() {
        List<TeamDTO> Teams = TeamService.getAllTeams();
        return new ResponseEntity<>(Teams, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable int id) {
        Optional<TeamDTO> Team = TeamService.getTeamById(id);
        return Team.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/updateScore/{id}")
    public ResponseEntity<TeamDTO> updateTeamScore(@PathVariable int id) {
        Optional<TeamDTO> optionalTeam = TeamService.getTeamById(id);

        if (optionalTeam.isPresent()) {
            TeamDTO team = optionalTeam.get();
            team.setScore(team.getScore() + 3); // Add 3 to the score

            TeamDTO updatedTeam = TeamService.updateTeam(team);
            return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/byLeague/{leagueId}")
    public List<TeamDTO> getTeamsByLeagueId(@PathVariable int leagueId) {
        return TeamService.getTeamsByLeagueId(leagueId);
    }
    @GetMapping("/getWinner/{leagueId}")
public ResponseEntity<TeamDTO> getWinnerByLeagueId(@PathVariable int leagueId) {
    TeamDTO winningTeam = TeamService.getTeamWithMaxScoreByLeagueId(leagueId);
    
    if (winningTeam != null) {
        return new ResponseEntity<>(winningTeam, HttpStatus.OK);
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}

@GetMapping("/getLeague/{teamId}")
    public ResponseEntity<Integer> getLeagueForTeam(@PathVariable int teamId) {
        int leagueId = TeamService.getLeagueIdForTeam(teamId);
        return ResponseEntity.ok(leagueId);
    }

        @PutMapping("/updateScoredraw/{id}")
    public ResponseEntity<TeamDTO> updateTeamScore1(@PathVariable int id) {
        Optional<TeamDTO> optionalTeam = TeamService.getTeamById(id);

        if (optionalTeam.isPresent()) {
            TeamDTO team = optionalTeam.get();
            team.setScore(team.getScore() + 1); // Add 3 to the score

            TeamDTO updatedTeam = TeamService.updateTeam(team);
            return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TeamDTO> updateTeam(@PathVariable int id, @RequestBody TeamDTO Team) {
        Team.setId(id);
        TeamDTO updatedTeam = TeamService.updateTeam(Team);
        return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTeamById(@PathVariable int id) {
        TeamService.deleteTeamById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
