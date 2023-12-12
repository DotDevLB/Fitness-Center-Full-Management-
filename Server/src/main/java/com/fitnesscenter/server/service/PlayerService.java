package com.fitnesscenter.server.service;

import com.fitnesscenter.server.models.PlayerDTO;
import com.fitnesscenter.server.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private  PlayerRepository PlayerRepository;

    
    public PlayerService(PlayerRepository PlayerRepository) {
        this.PlayerRepository = PlayerRepository;
    }

    public List<PlayerDTO> getAllPlayers() {
        return PlayerRepository.findAll();
    }

    public List<PlayerDTO> getAllPlayersByTeamId(int teamId) {
        return PlayerRepository.findAllByTeamId(teamId);
    }
    
    public Optional<PlayerDTO> getPlayerById(int id) {
        return PlayerRepository.findById(id);
    }

    public PlayerDTO createPlayer(PlayerDTO Player) {
        return PlayerRepository.save(Player);
    }

    public PlayerDTO updatePlayer(PlayerDTO Player) {
        return PlayerRepository.save(Player);
    }

    public void deletePlayerById(int id) {
        PlayerRepository.deleteById(id);
    }
}
