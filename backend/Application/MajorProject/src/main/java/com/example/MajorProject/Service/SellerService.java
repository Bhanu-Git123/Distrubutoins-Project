package com.example.MajorProject.Service;

import com.example.MajorProject.Entity.Seller;
import com.example.MajorProject.Repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerService {
    @Autowired
    private SellerRepository sellerRepository;

    public Seller register(Seller seller) {
        return sellerRepository.save(seller);
    }


}
