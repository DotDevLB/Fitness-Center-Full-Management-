package com.fitnesscenter.server.service;

import com.fitnesscenter.server.models.MatchDTO;
import com.fitnesscenter.server.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository MatchRepository;

    public List<MatchDTO> getAllMatchs() {
        return MatchRepository.findAll();
    }

    public boolean checkReservationExists(int reservationId) {
        return MatchRepository.existsByReservationId(reservationId);
    }

    public List<MatchDTO> getMatchesByLeague(String leagueId) {
        return MatchRepository.findByLeagueId(leagueId);
    }

    public Optional<MatchDTO> getMatchById(int id) {
        return MatchRepository.findById(id);
    }

    public MatchDTO createMatch(MatchDTO Match) {
        return MatchRepository.save(Match);
    }

    public MatchDTO updateMatch(MatchDTO Match) {
        return MatchRepository.save(Match);
    }

    public void deleteMatchById(int id) {
        MatchRepository.deleteById(id);
    }
}
