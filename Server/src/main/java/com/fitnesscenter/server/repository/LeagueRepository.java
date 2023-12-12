package com.fitnesscenter.server.repository;

import com.fitnesscenter.server.models.LeagueDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface LeagueRepository extends JpaRepository<LeagueDTO, Integer> {
   
}