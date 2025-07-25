package com.example.MajorProject.DTO;

public class OrderRequestDTO {
    private Long customerId;
    private String productName;  // ✅ new
    private double price;        // ✅ new
    private int quantity;
    private double advancePayment;

    // Getters and Setters
    public Long getCustomerId() {
        return customerId;
    }
    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getAdvancePayment() {
        return advancePayment;
    }
    public void setAdvancePayment(double advancePayment) {
        this.advancePayment = advancePayment;
    }
}
