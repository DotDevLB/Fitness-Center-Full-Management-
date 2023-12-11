package com.fitnesscenter.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitnesscenter.server.models.PitchDTO;
import com.fitnesscenter.server.repository.PitchRepository;

@Service
public class PitchService {
    @Autowired
    private PitchRepository repository;
    

    public PitchDTO savePitch(PitchDTO Pitch){
        return repository.save(Pitch);
    }

    public List<PitchDTO> savePitches(List<PitchDTO> Pitchs){
        return repository.saveAll(Pitchs);
    }

    public List<PitchDTO> getPitches(){
        return repository.findAll();
    }
    
    public PitchDTO getProducById(int id){
        return repository.findById(id).orElse(null);
    }
     public PitchDTO getPitchByName(String name){
        return repository.findByName(name);
    }

     public List<PitchDTO> getPitchesByName(String name){
        return repository.findAllByName(name);
    }

    public String deletePitch(int id){
        repository.deleteById(id);
        return "Pitch remove! "+id;
    }
   
    public PitchDTO updatePitchById(int id, PitchDTO updatedPitch) {
        return repository.findById(id)
            .map(pitch -> {
                pitch.setName(updatedPitch.getName());
                pitch.setDescription(updatedPitch.getDescription());
                pitch.setCostPerHour(updatedPitch.getCostPerHour());
                pitch.setMaxPlayers(updatedPitch.getMaxPlayers());
                pitch.setSurfaceType(updatedPitch.getSurfaceType());
                pitch.setSizeInSquareMeters(updatedPitch.getSizeInSquareMeters());
                pitch.setLongitude(updatedPitch.getLongitude());
                pitch.setLatitude(updatedPitch.getLatitude());
                return repository.save(pitch);
            })
            .orElseThrow(() -> new IllegalArgumentException("Pitch with id " + id + " not found"));
    }
    

}
