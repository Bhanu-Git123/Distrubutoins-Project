package com.example.MajorProject.Controller;

import com.example.MajorProject.Entity.Admin;
import com.example.MajorProject.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminSetupController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        return ResponseEntity.ok(adminRepository.save(admin));
    }
}
