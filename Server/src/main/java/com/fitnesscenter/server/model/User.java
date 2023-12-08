package com.fitnesscenter.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public int getId(){
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    private String firstName;
      
    private String lastName;
 
    private String email;
    
    private String password;

   
    private String address;
   
    private String dob;
private String role;
    // Constructors (you can generate these based on your needs)



    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
    public void setEmail(String email){
        this.email=email;
    }
     public String getEmail() {
        return email;
    }
       public void setPassword(String password){
        this.password=password;
    }
     public String getPassword() {
        return password;
    }
     public String getRole() {
        return role;
    }
 public void setRole(String role){
        this.role=role;
                }
}






