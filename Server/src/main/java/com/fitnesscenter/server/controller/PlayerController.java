package com.fitnesscenter.server.controller;

import com.fitnesscenter.server.models.PlayerDTO;
import com.fitnesscenter.server.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Players")
public class PlayerController {

     @Autowired
    private  PlayerService PlayerService;


    @PostMapping("/save")
public ResponseEntity<PlayerDTO> addPlayer(@RequestBody PlayerDTO Player) {
    PlayerDTO createdPlayer = PlayerService.createPlayer(Player);
    return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
}
@GetMapping("/team/{teamId}")
    public ResponseEntity<List<PlayerDTO>> getAllPlayersByTeamId(@PathVariable int teamId) {
        List<PlayerDTO> players = PlayerService.getAllPlayersByTeamId(teamId);
        return ResponseEntity.ok(players);
    }

    @GetMapping
    public ResponseEntity<List<PlayerDTO>> getAllPlayers() {
        List<PlayerDTO> Players = PlayerService.getAllPlayers();
        return new ResponseEntity<>(Players, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDTO> getPlayerById(@PathVariable int id) {
        Optional<PlayerDTO> Player = PlayerService.getPlayerById(id);
        return Player.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<PlayerDTO> updatePlayer(@PathVariable int id, @RequestBody PlayerDTO Player) {
        Player.setId(id);
        PlayerDTO updatedPlayer = PlayerService.updatePlayer(Player);
        return new ResponseEntity<>(updatedPlayer, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePlayerById(@PathVariable int id) {
        PlayerService.deletePlayerById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
