package com.example.be.service.product;

import com.example.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<Product> searchProduct(String name
            ,String productTypeId
            ,String producerId
            ,Pageable pageable);
    Product findByProduct(int id);
}
