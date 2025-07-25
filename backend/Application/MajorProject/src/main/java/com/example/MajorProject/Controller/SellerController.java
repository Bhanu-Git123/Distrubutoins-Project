package com.example.MajorProject.Controller;


import com.example.MajorProject.Entity.Seller;
import com.example.MajorProject.Repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    @GetMapping("/all")
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSeller(@RequestBody Seller seller) {
        if (sellerRepository.findByMobile(seller.getMobile()) != null) {
            return ResponseEntity.badRequest().body("Seller with this mobile already exists");
        }
        seller.setBalance(0);
        sellerRepository.save(seller);
        return ResponseEntity.ok("Seller added successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateSeller(@RequestBody Seller seller) {
        Seller existing = sellerRepository.findById(seller.getId()).orElse(null);
        if (existing == null) return ResponseEntity.badRequest().body("Seller not found");

        existing.setName(seller.getName());
        existing.setMobile(seller.getMobile());
        existing.setAddress(seller.getAddress());
        existing.setBalance(seller.getBalance());

        sellerRepository.save(existing);
        return ResponseEntity.ok("Seller updated successfully");
    }
}
