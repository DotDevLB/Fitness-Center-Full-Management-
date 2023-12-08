package com.fitnesscenter.server.repository;

import com.fitnesscenter.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface UserRepesotiry extends JpaRepository<User, Integer> {
    
}
