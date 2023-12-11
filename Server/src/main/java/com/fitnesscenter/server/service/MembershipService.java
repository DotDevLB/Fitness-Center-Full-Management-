package com.fitnesscenter.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitnesscenter.server.models.MembershipDTO;
import com.fitnesscenter.server.repository.MembershipRepository;

@Service
public class MembershipService {
 

    @Autowired
      private  MembershipRepository membershipRepository;

    public List<MembershipDTO> getAllMemberships() {
        return membershipRepository.findAll();
    }

    public MembershipDTO getMembershipById(Long id) {
        return membershipRepository.findById(id).orElse(null);
    }

    public  MembershipDTO createMembership(MembershipDTO membershipDTO) {
   
        return membershipRepository.save(membershipDTO);
    }
    public boolean deleteMembership(Long id) {
        Optional<MembershipDTO> membershipOptional = membershipRepository.findById(id);
        if (membershipOptional.isPresent()) {
            membershipRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public MembershipDTO updateMembership(Long id, MembershipDTO updatedMembership) {
        Optional<MembershipDTO> membershipOptional = membershipRepository.findById(id);
        if (membershipOptional.isPresent()) {
            MembershipDTO existingMembership = membershipOptional.get();
            existingMembership.setFirstName(updatedMembership.getFirstName());
            existingMembership.setLastName(updatedMembership.getLastName());
            existingMembership.setDob(updatedMembership.getDob());
            existingMembership.setEmail(updatedMembership.getEmail());
            existingMembership.setPhoneNumber(updatedMembership.getPhoneNumber());
            existingMembership.setMembershipStartDate(updatedMembership.getMembershipStartDate());
            existingMembership.setMembershipEndDate(updatedMembership.getMembershipEndDate());
            return membershipRepository.save(existingMembership);
        }
        return null;
    }
}
