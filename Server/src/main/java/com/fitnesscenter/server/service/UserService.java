package com.fitnesscenter.server.service;

import com.fitnesscenter.server.models.UserDTO;
import com.fitnesscenter.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;

    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDTO> getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
    
    public Optional<UserDTO> getUserById(int id) {
        return userRepository.findById(id);
    }

    public UserDTO createUser(UserDTO user) {
        return userRepository.save(user);
    }

    public UserDTO updateUser(UserDTO user) {
        return userRepository.save(user);
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }
}
