package com.example.be.controller.product;

import com.example.be.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@CrossOrigin("*")
@RequestMapping("product")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @GetMapping("")
    public ResponseEntity<?> searchProduct(@RequestParam(required = false,defaultValue = "") String name,
                                           @RequestParam(required = false,defaultValue = "") String productTypeId,
                                           @RequestParam(required = false,defaultValue = "") String producerId,
                                           Long minPrice,
                                           Long maxPrice,
                                           @PageableDefault(size = 6) Pageable pageable,
                                           @RequestParam(required = false,defaultValue = "") String sortType
                                           ){
        Sort sort = null;
        switch (sortType){
            case "Tên: A-Z":
                sort =  Sort.by("name").ascending();
                break;
            case "Tên: Z-A":
                sort =  Sort.by("name").descending();
                break;
            case "Giá: Tăng dần":
                sort =  Sort.by("price_sale").ascending();
                break;
            case "Giá: Giảm dần":
                sort =  Sort.by("price_sale").descending();
                break;
            default:
                sort =  Sort.by("id").descending();
        }
        Pageable sortedPageaBle = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return new ResponseEntity<>(iProductService.searchProduct(name,productTypeId,producerId,minPrice,maxPrice,sortedPageaBle),HttpStatus.OK);
    }
    @GetMapping("detail")
    public ResponseEntity<?> detailProduct(@RequestParam(required = false)Integer id){
        return new ResponseEntity<>(iProductService.findByProduct(id),HttpStatus.OK);
    }
}
