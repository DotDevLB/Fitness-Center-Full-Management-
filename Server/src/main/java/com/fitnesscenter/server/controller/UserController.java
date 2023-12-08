package com.fitnesscenter.server.controller;

import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesscenter.server.model.User;
import com.fitnesscenter.server.Service.UserService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user) {
        userService.saveUser(user);
        return "User added successfully";
    }
    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        
        return userService.getAllUsers();

    }

    @GetMapping("getUser/{employeeId}")
    public User getUser(@PathVariable int employeeId) {
        return userService.getSpecificUser(employeeId);
    }
    
    

  

//     @PostMapping("/login")
// public String yourMappingFunction(
//         @RequestParam("firstName") String firstName,
//         @RequestParam("lastName") String lastName){
//         boolean isMatch = userService.checkForMatch(firstName,lastName);
    
//         if (isMatch) {
//             return "Match found for: " + firstName;
//         } else {
//             return "No match found for: " + firstName;
//         }
//     }
    
    
@PostMapping("/login")
public String yourMappingFunction(
        @RequestParam("email") String email,
        @RequestParam("password") String password,
        
        HttpServletResponse response) {
    String isMatch = userService.checkForMatch(email, password,response);

    if (isMatch=="employee") {
        return "Employee for: " ;
    } else if (isMatch=="admin"){
 return "Admin for: " ;
    }else  {
        return "No match found for: " + email;
    }
}


@PutMapping("/update/{employeeId}")
public String update(@PathVariable int employeeId, @RequestBody User user) {
    userService.updateUser(employeeId, user);
    return "User updated successfully";
}


@DeleteMapping("/deleteUser/{employeeId}")
public String delete(@PathVariable int employeeId) {
    userService.deleteTheUser(employeeId);
    return "User deleted successfully";
}

}



