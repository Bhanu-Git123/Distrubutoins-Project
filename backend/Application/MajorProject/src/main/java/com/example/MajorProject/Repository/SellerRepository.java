package com.example.MajorProject.Repository;

import com.example.MajorProject.Entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByMobile(String mobile);  // if needed

}
