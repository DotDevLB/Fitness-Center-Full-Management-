package com.fitnesscenter.server.models;



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

public class EmailData {
    private String to;
    private String[] cc;
    private String subject;
    private String body;
}
