package com.fitnesscenter.server.Service;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.fitnesscenter.server.model.User;
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public String checkForMatch(String inputString1,String inputString2,HttpServletResponse response);
    public User updateUser(int id,User user);
    public User getSpecificUser(int id );
    public String deleteTheUser(int id);
}
