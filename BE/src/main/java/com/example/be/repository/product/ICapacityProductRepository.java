package com.example.be.repository.product;

import com.example.be.model.CapacityProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICapacityProductRepository extends JpaRepository<CapacityProduct,Integer> {
    CapacityProduct findById(int id);
}
