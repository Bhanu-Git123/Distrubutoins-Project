package com.example.MajorProject.Controller;

import com.example.MajorProject.Entity.Product;
import com.example.MajorProject.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add a product
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        productRepository.save(product);
        return ResponseEntity.ok("Product added successfully");
    }

    // Update product
    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        if (!productRepository.existsById(product.getId())) {
            return ResponseEntity.badRequest().body("Product not found");
        }

        productRepository.save(product);
        return ResponseEntity.ok("Product updated successfully");
    }

    // Delete product
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Product not found");
        }

        productRepository.deleteById(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}
