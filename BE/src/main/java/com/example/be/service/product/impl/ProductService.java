package com.example.be.service.product.impl;

import com.example.be.model.Product;
import com.example.be.repository.product.IProductRepository;
import com.example.be.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public Page<Product> searchProduct(String name, String productTypeId, String producerId, Pageable pageable) {
        return iProductRepository.searchProduct(name,productTypeId,producerId,pageable);
    }

    @Override
    public Product findByProduct(int id) {
        return iProductRepository.findById(id);
    }
}
