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

import com.fitnesscenter.server.models.ReservationDTO;
import com.fitnesscenter.server.service.ReservationService;



@RestController
@RequestMapping("/reservations")
public class ReservationController {

    

    @Autowired
    private  ReservationService service;

    @GetMapping("/all")
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<ReservationDTO> reservations = service.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        ReservationDTO reservation = service.getReservationById(id);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUserId(@PathVariable int userId) {
        List<ReservationDTO> reservations = service.getReservationsByUserId(userId);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
    @GetMapping("/pitch/{pitchId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByPitchId(@PathVariable int pitchId) {
        List<ReservationDTO> reservations = service.getReservationsByPitchId(pitchId);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<ReservationDTO> addReservation(@RequestBody ReservationDTO reservationDTO) {
        ReservationDTO newReservation = service.addReservation(reservationDTO);
        return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable Long id, @RequestBody ReservationDTO reservationDTO) {
        ReservationDTO updatedReservation = service.updateReservation(id, reservationDTO);
        return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        service.deleteReservation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
