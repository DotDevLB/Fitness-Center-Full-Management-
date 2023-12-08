
package com.fitnesscenter.server.Service;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitnesscenter.server.model.User;
import com.fitnesscenter.server.repository.UserRepesotiry;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepesotiry userRepesotiry;

    @Override
    public User saveUser(User user) {
        // TODO Auto-generated method stub
      return userRepesotiry.save(user);
    }

    @Override
    public List<User> getAllUsers() {
     return userRepesotiry.findAll();
    }

    @Override
    public User getSpecificUser(int id) {
        // TODO Auto-generated method stub
    
        return userRepesotiry.findById(id).orElse(null);
    }
    

    // @Override
    // public boolean checkForMatch(String firstName, String lastName) {
    //     List<User> userList = getAllUsers(); 
    //     for (User user : userList) {
    //         System.out.println("Comparing: " + user.getFirstName() + " with " + firstName);
    //         System.out.println("Comparing: " + user.getLastName() + " with " + lastName);
    //         if (user.getFirstName().equalsIgnoreCase(firstName) && user.getLastName().equalsIgnoreCase(lastName)) {
    //             System.out.println("Match found!");
    //             return true; // Match found
    //         }
    //     }
    //     System.out.println("No match found.");
    //     return false; // No match found
    // }
    ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String checkForMatch(String email, String password,HttpServletResponse response) {
        List<User> userList = getAllUsers(); 
        for (User user : userList) {
            System.out.println("Comparing: " + user.getEmail() + " with " + email);
            System.out.println("Comparing: " + user.getPassword() + " with " + password);
    
            // Check for null values before invoking equalsIgnoreCase
            if (user.getEmail() != null && user.getEmail().equalsIgnoreCase(email) &&
                user.getPassword() != null && user.getPassword().equalsIgnoreCase(password)) {
                    int userId = user.getId(); // Assuming there is a method getId() in your User class
                    setUserIdCookie(userId,response);
                    // String userJson = objectMapper.writeValueAsString(user);
                if(user.getRole().equals("Employee")) {
                    System.out.println("Match found!");
                    return "employee"; // Match found
                } else if(user.getRole().equals("Admin")) {
                    System.out.println("Match found!");
                    return "admin"; // Match found
                }
            }
        }
        
        System.out.println("No match found.");
        return "false"; // No match found
    }
    // Example method to set a cookie with the user ID
    private void setUserIdCookie(int userId, HttpServletResponse response) {
        // Convert userId to String
        String userIdString = String.valueOf(userId);
    
        // Create a new cookie
        Cookie userIdCookie = new Cookie("userId", userIdString);
    
        // Set the cookie path, you can customize this based on your application's needs
        userIdCookie.setPath("/");
    
        // Set the cookie to expire in, for example, 24 hours (you can adjust the maxAge accordingly)
        userIdCookie.setMaxAge(24 * 60 * 60); // 24 hours in seconds
    
        // Add the cookie to the response
        response.addCookie(userIdCookie);
    }
    
    
    
    @Override
    public User updateUser(int employeeId, User user) {
        // Check if the user with the given ID exists
        if (userRepesotiry.existsById(employeeId)) {
            // Set the ID of the user based on the path variable
            user.setId(employeeId);
            
            // Update the user
            return userRepesotiry.save(user);
        } else {
            // Handle the case where the user with the given ID doesn't exist
            throw new IllegalArgumentException("User with ID " + employeeId + " not found");
        }
    }

    @Override
    public String deleteTheUser(int id) {
        try {
            // Assuming userRepository.deleteById returns void or throws an exception on failure
            userRepesotiry.deleteById(id);
            return "User deleted successfully";
        } catch (EmptyResultDataAccessException e) {
            return "Failed to delete user. User not found.";
        } catch (Exception e) {
            return "Failed to delete user. An error occurred: " + e.getMessage();
        }
    }

    
    
    
    }