package com.example.MajorProject.Repository;

import com.example.MajorProject.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByMobile(String mobile);
}
