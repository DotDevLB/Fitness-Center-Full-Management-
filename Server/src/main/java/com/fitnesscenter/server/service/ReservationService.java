package com.fitnesscenter.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fitnesscenter.server.models.ReservationDTO;
import com.fitnesscenter.server.repository.ReservationRepository;
import java.util.Optional;

@Service
public class ReservationService {


    @Autowired
      private ReservationRepository reservationRepository;


    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll();
    }

    public ReservationDTO getReservationById(Long id) {
        Optional<ReservationDTO> reservationOptional = reservationRepository.findById(id);
        return reservationOptional.orElse(null);
    }

    public ReservationDTO addReservation(ReservationDTO reservationDTO) {
        return reservationRepository.save(reservationDTO);
    }

    public ReservationDTO updateReservation(Long id, ReservationDTO reservationDTO) {
        if (reservationRepository.existsById(id)) {
            reservationDTO.setId(id);
            return reservationRepository.save(reservationDTO);
        }
        return null;
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public List<ReservationDTO> getReservationsByUserId(int userId) {
        return reservationRepository.findByUserId(userId);
    }
    

    public List<ReservationDTO> getReservationsByPitchId(int pitchId) {
        return reservationRepository.findByPitchId(pitchId);
    }
    
}
