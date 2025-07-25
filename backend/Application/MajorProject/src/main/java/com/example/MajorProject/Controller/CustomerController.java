package com.example.MajorProject.Controller;

import com.example.MajorProject.Entity.Customer;
import com.example.MajorProject.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access APIs
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // ✅ Get all customers
    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // ✅ Add a new customer
    @PostMapping("/add")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
        if (customerRepository.findByMobile(customer.getMobile()) != null) {
            return ResponseEntity.badRequest().body("Customer with this mobile already exists");
        }
        customer.setBalance(0); // new customer starts with 0 balance
        customerRepository.save(customer);
        return ResponseEntity.ok("Customer added successfully");
    }

    // ✅ Update customer details
    @PutMapping("/update")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) {
        Customer existing = customerRepository.findById(customer.getId()).orElse(null);
        if (existing == null) return ResponseEntity.badRequest().body("Customer not found");

        existing.setName(customer.getName());
        existing.setMobile(customer.getMobile());
        existing.setDistrict(customer.getDistrict());
        existing.setShopName(customer.getShopName());
        existing.setBalance(customer.getBalance());

        customerRepository.save(existing);
        return ResponseEntity.ok("Customer updated successfully");
    }

    // ✅ Delete customer by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        if (!customerRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Customer not found");
        }

        customerRepository.deleteById(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }
}
