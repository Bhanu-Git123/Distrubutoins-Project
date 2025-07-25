package com.example.MajorProject.Controller;

import com.example.MajorProject.Entity.Admin;
import com.example.MajorProject.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AdminRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginUser) {
        return userRepository.findByUsername(loginUser.getUsername())
                .map(user -> {
                    if (user.getPassword().equals(loginUser.getPassword())) {
                        return ResponseEntity.ok(user); // returns full User object with role
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }
}
