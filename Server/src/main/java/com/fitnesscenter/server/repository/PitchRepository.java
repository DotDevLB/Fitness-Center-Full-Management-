package com.fitnesscenter.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitnesscenter.server.models.PitchDTO;

public interface PitchRepository extends JpaRepository<PitchDTO, Integer> {

    PitchDTO findByName(String name);
    List<PitchDTO> findAllByName(String name);
}
