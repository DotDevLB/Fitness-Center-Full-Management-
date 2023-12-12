package com.fitnesscenter.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Team_TBL")
public class TeamDTO {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String description;
    private int league_id;
    private int score = 0; // Setting the default value to 0

    public TeamDTO() {
        // Default constructor
    }

    public TeamDTO(int id, String name, String description, int league_id, int score) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.league_id = league_id;
        this.score = score;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getLeague_id() {
        return league_id;
    }

    public int getScore() {
        return score;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLeague_id(int league_id) {
        this.league_id = league_id;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
