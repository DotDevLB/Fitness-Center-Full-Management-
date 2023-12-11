package com.fitnesscenter.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesscenter.server.models.MembershipDTO;
import com.fitnesscenter.server.service.MembershipService;
@RestController
@RequestMapping("/memberships")
public class MembershipController {
    
    @Autowired
    private MembershipService membershipService;


    @GetMapping
    public ResponseEntity<List<MembershipDTO>> getAllMemberships() {
        List<MembershipDTO> memberships = membershipService.getAllMemberships();
        return new ResponseEntity<>(memberships, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipDTO> getMembershipById(@PathVariable Long id) {
        MembershipDTO membership = membershipService.getMembershipById(id);
        if (membership == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(membership, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<MembershipDTO> saveMembership(@RequestBody MembershipDTO membershipDTO) {
        MembershipDTO savedMembership = membershipService.createMembership(membershipDTO);
        return new ResponseEntity<>(savedMembership, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMembership(@PathVariable Long id) {
        boolean deleted = membershipService.deleteMembership(id);
        if (deleted) {
            return new ResponseEntity<>("Membership deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Membership not found", HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<MembershipDTO> updateMembership(@PathVariable Long id, @RequestBody MembershipDTO updatedMembership) {
        MembershipDTO existingMembership = membershipService.getMembershipById(id);
        if (existingMembership == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        MembershipDTO updated = membershipService.updateMembership(id, updatedMembership);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Or appropriate status for update failure
        }
        
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

}

