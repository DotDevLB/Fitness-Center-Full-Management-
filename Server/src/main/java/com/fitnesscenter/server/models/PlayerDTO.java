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
@Table(name="Player_TBL")
public class PlayerDTO {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private int team_id;
  
    // 1=admin, 0=staff
}
