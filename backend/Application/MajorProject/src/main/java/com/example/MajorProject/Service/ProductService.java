package com.example.MajorProject.Service;

import com.example.MajorProject.Entity.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Long sellerId, Product product);
    List<Product> getAllProducts();
    List<Product> getProductsBySeller(Long sellerId);
    List<Product> getProductBySeller(Long sellerId);
}
