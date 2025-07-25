package com.example.MajorProject.Repository;

import com.example.MajorProject.Entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
    Object findByCustomerId(Long customerId);
    // You can define custom queries if needed
}
