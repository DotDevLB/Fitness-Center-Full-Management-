package com.fitnesscenter.server.service;

import com.fitnesscenter.server.models.LeagueDTO;
import com.fitnesscenter.server.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeagueService {

    @Autowired
    private  LeagueRepository LeagueRepository;

    
    public LeagueService(LeagueRepository LeagueRepository) {
        this.LeagueRepository = LeagueRepository;
    }

    public List<LeagueDTO> getAllLeagues() {
        return LeagueRepository.findAll();
    }

    
    
    public Optional<LeagueDTO> getLeagueById(int id) {
        return LeagueRepository.findById(id);
    }

    public LeagueDTO createLeague(LeagueDTO League) {
        return LeagueRepository.save(League);
    }

    public LeagueDTO updateLeague(LeagueDTO League) {
        return LeagueRepository.save(League);
    }

    public void deleteLeagueById(int id) {
        LeagueRepository.deleteById(id);
    }
}
