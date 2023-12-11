package com.fitnesscenter.server.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Pitch_TBL")
public class PitchDTO{
    
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String description;
    @Column(name = "cost_per_hour")
    private double costPerHour;  
    private int maxPlayers;
    private String surfaceType;
    private double sizeInSquareMeters;
    private double longitude;
    private double latitude;
    
}
