package com.example.MajorProject.Service;

import com.example.MajorProject.Entity.CustomerOrder;
import com.example.MajorProject.Repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerOrderService {

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    public CustomerOrder saveOrder(CustomerOrder order) {
        return customerOrderRepository.save(order);
    }

    public List<CustomerOrder> getOrdersByCustomerId(Long customerId) {
        return customerOrderRepository.findByCustomerId(customerId);
    }

    public void deleteOrder(Long orderId) {
        customerOrderRepository.deleteById(orderId);
    }
}
