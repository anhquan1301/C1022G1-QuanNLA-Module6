package com.example.be.controller.product;

import com.example.be.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("product")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @GetMapping("")
    public ResponseEntity<?> searchProduct(@RequestParam(required = false,defaultValue = "")String name,
                                           String productTypeId,
                                           String producerId,
                                           @PageableDefault(sort = {"id"},direction = Sort.Direction.DESC,size = 6) Pageable pageable){
        return new ResponseEntity<>(iProductService.searchProduct(name,productTypeId,producerId,pageable),HttpStatus.OK);
    }
    @GetMapping("detail")
    public ResponseEntity<?> detailProduct(@RequestParam(required = false)Integer id){
        return new ResponseEntity<>(iProductService.findByProduct(id),HttpStatus.OK);
    }
}
