package com.example.be.service.product;

import com.example.be.model.CapacityProduct;

public interface ICapacityProductService {
    CapacityProduct findById(int id);
    void updateQuantityProduct (CapacityProduct capacityProduct);
}
