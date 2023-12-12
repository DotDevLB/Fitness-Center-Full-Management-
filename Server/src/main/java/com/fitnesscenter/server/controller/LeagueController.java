package com.fitnesscenter.server.controller;

import com.fitnesscenter.server.models.LeagueDTO;
import com.fitnesscenter.server.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Leagues")
public class LeagueController {

     @Autowired
    private  LeagueService LeagueService;


    @PostMapping("/save")
public ResponseEntity<LeagueDTO> addLeague(@RequestBody LeagueDTO League) {
    LeagueDTO createdLeague = LeagueService.createLeague(League);
    return new ResponseEntity<>(createdLeague, HttpStatus.CREATED);
}


    @GetMapping
    public ResponseEntity<List<LeagueDTO>> getAllLeagues() {
        List<LeagueDTO> Leagues = LeagueService.getAllLeagues();
        return new ResponseEntity<>(Leagues, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeagueDTO> getLeagueById(@PathVariable int id) {
        Optional<LeagueDTO> League = LeagueService.getLeagueById(id);
        return League.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<LeagueDTO> updateLeague(@PathVariable int id, @RequestBody LeagueDTO League) {
        League.setId(id);
        LeagueDTO updatedLeague = LeagueService.updateLeague(League);
        return new ResponseEntity<>(updatedLeague, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLeagueById(@PathVariable int id) {
        LeagueService.deleteLeagueById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
