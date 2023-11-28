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
@Table(name="Product_TBL")
public class ProductDTO{
    
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String description;
    private double price;
    private int quantityAvailable;
    private String flavor;
}
