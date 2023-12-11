package com.fitnesscenter.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitnesscenter.server.models.MembershipDTO;

@Repository
public interface MembershipRepository extends JpaRepository<MembershipDTO, Long> {
}