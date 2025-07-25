package com.example.MajorProject.Service;

import com.example.MajorProject.Entity.Admin;
import com.example.MajorProject.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServicee {

    @Autowired
    private AdminRepository userRepository;

    public Admin createUser(Admin user) {
        return userRepository.save(user);
    }

    public Optional<Admin> resetPassword(String username, String newPassword) {
        Optional<Admin> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            Admin user = optionalUser.get();
            user.setPassword(newPassword);
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    public boolean adminExists() {
        return userRepository.findAll().stream()
                .anyMatch(user -> "ADMIN".equalsIgnoreCase(user.getUsername())); // FIXED
    }

    public Admin createAdmin(Admin admin) {
        return userRepository.save(admin);
    }

    public Optional<Admin> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
