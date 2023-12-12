package com.fitnesscenter.server.models;


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
@Table(name="Macth_TBL")
public class MatchDTO {
    @Id
    @GeneratedValue
    private int id;
    private int team_id1;
    private int team_id2;
    private double score_team_id1;
    private double score_team_id2;
    private int reservation_id;
    private int pitch_id;

    private String league_id;
    
}
