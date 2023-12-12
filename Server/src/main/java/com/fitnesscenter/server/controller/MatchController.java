package com.fitnesscenter.server.controller;

import com.fitnesscenter.server.models.MatchDTO;
import com.fitnesscenter.server.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matches")
public class MatchController {

     @Autowired
    private  MatchService MatchService;


    @PostMapping("/save")
public ResponseEntity<MatchDTO> addMatch(@RequestBody MatchDTO Match) {
    MatchDTO createdMatch = MatchService.createMatch(Match);
    return new ResponseEntity<>(createdMatch, HttpStatus.CREATED);
}


    @GetMapping
    public ResponseEntity<List<MatchDTO>> getAllMatchs() {
        List<MatchDTO> Matchs = MatchService.getAllMatchs();
        return new ResponseEntity<>(Matchs, HttpStatus.OK);
    }
    @GetMapping("/checkReservation/{reservationId}")
    public ResponseEntity<Boolean> checkReservationExists(@PathVariable int reservationId) {
        boolean exists = MatchService.checkReservationExists(reservationId);
        return ResponseEntity.ok(exists);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MatchDTO> getMatchById(@PathVariable int id) {
        Optional<MatchDTO> Match = MatchService.getMatchById(id);
        return Match.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/league/{leagueId}")
    public List<MatchDTO> getMatchesByLeague(@PathVariable String leagueId) {
        return MatchService.getMatchesByLeague(leagueId);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MatchDTO> updateMatch(@PathVariable int id, @RequestBody MatchDTO Match) {
        Match.setId(id);
        MatchDTO updatedMatch = MatchService.updateMatch(Match);
        return new ResponseEntity<>(updatedMatch, HttpStatus.OK);
    }



    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMatchById(@PathVariable int id) {
        MatchService.deleteMatchById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
