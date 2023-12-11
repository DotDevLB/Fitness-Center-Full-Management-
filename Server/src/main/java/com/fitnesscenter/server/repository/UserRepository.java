package com.fitnesscenter.server.repository;

import com.fitnesscenter.server.models.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<UserDTO, Integer> {
    Optional<UserDTO> findByEmailAndPassword(String email, String password);
}