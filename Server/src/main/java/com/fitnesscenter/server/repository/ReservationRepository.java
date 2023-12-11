package com.fitnesscenter.server.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitnesscenter.server.models.ReservationDTO;

public interface ReservationRepository extends JpaRepository<ReservationDTO, Long> {
    List<ReservationDTO> findByUserId(int userId);

    List<ReservationDTO> findByPitchId(int pitchId);
}
