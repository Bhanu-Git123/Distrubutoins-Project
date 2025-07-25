package com.example.MajorProject.Service;

import com.example.MajorProject.Entity.Customer;
import com.example.MajorProject.Entity.CustomerOrder;
import com.example.MajorProject.Entity.Product;
import com.example.MajorProject.Repository.CustomerRepository;
import com.example.MajorProject.Repository.CustomerOrderRepository;
import com.example.MajorProject.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public String placeOrder(CustomerOrder order) {
        Optional<Customer> customerOpt = customerRepository.findById(order.getCustomer().getId());
        Optional<Product> productOpt = productRepository.findById(order.getProduct().getId());

        if (customerOpt.isEmpty() || productOpt.isEmpty()) {
            return "Invalid customer or product";
        }

        Customer customer = customerOpt.get();
        Product product = productOpt.get();

        // Calculate balance
        double totalPrice = order.getQuantity() * product.getPrice();
        double balance = totalPrice - order.getAdvancePayment();

        order.setBalance(balance);
        order.setCustomer(customer);
        order.setProduct(product);

        // Update customer balance
        customer.setBalance(customer.getBalance() + balance);
        customerRepository.save(customer);

        customerOrderRepository.save(order);

        return "Order placed successfully";
    }
}
