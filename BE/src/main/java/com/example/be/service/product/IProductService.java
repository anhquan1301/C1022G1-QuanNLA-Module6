package com.example.be.service.product;

import com.example.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;

public interface IProductService {
    Page<Product> searchProduct(String name
            , String productTypeId
            , String producerId
            , long minPrice
            , long maxPrice
            , Pageable pageable);
    Product findByProduct(int id);
}
