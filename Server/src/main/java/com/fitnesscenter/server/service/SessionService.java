package com.fitnesscenter.server.service;

import com.fitnesscenter.server.models.UserDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@Service
public class SessionService {

    private final Map<String, UserDTO> sessionStore = new HashMap<>();

    public void storeSession(String sessionToken, UserDTO user) {
        // Store the session token mapped to the user data
        sessionStore.put(sessionToken, user);
    }

    public UserDTO getUserFromSession(String sessionToken) {
        // Retrieve the user data associated with the session token
        return sessionStore.get(sessionToken);
    }

    public void removeSession(String sessionToken) {
        // Remove the session token and associated user data
        sessionStore.remove(sessionToken);
    }
}
