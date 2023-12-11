package com.fitnesscenter.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesscenter.server.models.PitchDTO;
import com.fitnesscenter.server.service.PitchService;
@RestController
@RequestMapping("/pitches")
public class PitchController {

    @Autowired
    private PitchService service;

    @PostMapping("/save")
    public ResponseEntity<PitchDTO> savePitch(@RequestBody PitchDTO Pitch) {
        PitchDTO savedPitch = service.savePitch(Pitch);
        return new ResponseEntity<>(savedPitch, HttpStatus.CREATED);
    }

    @PostMapping("/saveAll")
    public ResponseEntity<List<PitchDTO>> savePitches(@RequestBody List<PitchDTO> Pitches) {
        List<PitchDTO> savedPitches = service.savePitches(Pitches);
        return new ResponseEntity<>(savedPitches, HttpStatus.CREATED);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<PitchDTO>> getPitches() {
        List<PitchDTO> Pitches = service.getPitches();
        return new ResponseEntity<>(Pitches, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PitchDTO> getPitchById(@PathVariable int id) {
        PitchDTO Pitch = service.getProducById(id);
        if (Pitch != null) {
            return new ResponseEntity<>(Pitch, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<PitchDTO> getPitchByName(@PathVariable String name) {
        PitchDTO Pitch = service.getPitchByName(name);
        if (Pitch != null) {
            return new ResponseEntity<>(Pitch, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/names/{name}")
    public ResponseEntity<List<PitchDTO>> getPitchesByName(@PathVariable String name) {
        List<PitchDTO> Pitches = service.getPitchesByName(name);
        return new ResponseEntity<>(Pitches, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePitch(@PathVariable int id) {
        service.deletePitch(id);
        return new ResponseEntity<>("Pitch removed! " + id, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PitchDTO> updatePitchById(@PathVariable int id, @RequestBody PitchDTO Pitch) {
        PitchDTO updatedPitch = service.updatePitchById(id, Pitch);
        if (updatedPitch != null) {
            return new ResponseEntity<>(updatedPitch, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}