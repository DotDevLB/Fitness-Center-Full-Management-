package com.fitnesscenter.server.repository;

import com.fitnesscenter.server.models.MatchDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface MatchRepository extends JpaRepository<MatchDTO, Integer> {
     @Query("SELECT COUNT(m) > 0 FROM MatchDTO m WHERE m.reservation_id = :reservationId")
    boolean existsByReservationId(int reservationId);
     @Query("SELECT m FROM MatchDTO m WHERE m.league_id = :leagueId")
    List<MatchDTO> findByLeagueId(@Param("leagueId") String leagueId);
}