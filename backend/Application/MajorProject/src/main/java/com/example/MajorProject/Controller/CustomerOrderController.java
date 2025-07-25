package com.example.MajorProject.Controller;

import com.example.MajorProject.DTO.OrderRequestDTO;
import com.example.MajorProject.Entity.Customer;
import com.example.MajorProject.Entity.CustomerOrder;
import com.example.MajorProject.Entity.Product;
import com.example.MajorProject.Repository.CustomerRepository;
import com.example.MajorProject.Repository.CustomerOrderRepository;
import com.example.MajorProject.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerOrderController {

    @Autowired
    private CustomerOrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequestDTO dto) {
        Optional<Customer> customerOpt = customerRepository.findById(dto.getCustomerId());

        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid customer");
        }

        Customer customer = customerOpt.get();

        // ✅ Save product first
        Product product = new Product();
        product.setName(dto.getProductName());
        product.setPrice(dto.getPrice());
        product = productRepository.save(product);

        double totalPrice = dto.getQuantity() * product.getPrice();
        double balance = totalPrice - dto.getAdvancePayment();

        CustomerOrder order = new CustomerOrder();
        order.setCustomer(customer);
        order.setProduct(product);
        order.setQuantity(dto.getQuantity());
        order.setAdvancePayment(dto.getAdvancePayment());
        order.setBalance(balance);

        orderRepository.save(order);

        customer.setBalance(customer.getBalance() + balance);
        customerRepository.save(customer);

        return ResponseEntity.ok("Order placed successfully");
    }
}
