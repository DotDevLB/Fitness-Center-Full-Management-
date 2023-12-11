package com.fitnesscenter.server.models;


import java.time.LocalDateTime;
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
@Table(name="Reservation_TBL")
public class ReservationDTO {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private int pitchId = 1;
    private int userId;
    private String additionalDetails;
    private LocalDateTime startTime;
    private LocalDateTime endTime;


    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }


    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }


    public long calculateTimeDifference() {
        return java.time.Duration.between(startTime, endTime).toMinutes();
    }
}

