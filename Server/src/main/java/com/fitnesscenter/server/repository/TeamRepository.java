package com.fitnesscenter.server.repository;

import com.fitnesscenter.server.models.ReservationDTO;
import com.fitnesscenter.server.models.TeamDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TeamRepository extends JpaRepository<TeamDTO, Integer> {
     @Query("SELECT t FROM TeamDTO t WHERE t.league_id = :leagueId")
    List<TeamDTO> findByLeagueId(int leagueId);
    
}
