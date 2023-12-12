package com.fitnesscenter.server.repository;

import com.fitnesscenter.server.models.PlayerDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PlayerRepository extends JpaRepository<PlayerDTO, Integer> {
   @Query("SELECT p FROM PlayerDTO p WHERE p.team_id = :teamId")
    List<PlayerDTO> findAllByTeamId(@Param("teamId") int teamId);
}