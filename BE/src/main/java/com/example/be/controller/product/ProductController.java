package com.example.be.controller.product;

import com.example.be.dto.product.CapacityProductDTO;
import com.example.be.dto.product.ProductCreateDTO;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.model.*;
import com.example.be.service.product.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IProductTypeService iProductTypeService;
    @Autowired
    private IProducerService iProducerService;
    @Autowired
    private ICapacityService iCapacityService;
    @Autowired
    private IImageService iImageService;
    @Autowired
    private ICapacityProductService iCapacityProductService;
    @GetMapping("")
    public ResponseEntity<?> searchProduct(@RequestParam(required = false,defaultValue = "") String name,
                                           @RequestParam(required = false,defaultValue = "") String productTypeId,
                                           @RequestParam(required = false,defaultValue = "") String producerId,
                                           Long minPrice,
                                           Long maxPrice,
                                           @PageableDefault(size = 9) Pageable pageable,
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
                sort =  Sort.by("cp.price_sale").ascending();
                break;
            case "Giá: Giảm dần":
                sort =  Sort.by("cp.price_sale").descending();
                break;
            default:
                sort =  Sort.by("id").descending();
        }
            Pageable sortedPageaBle = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return new ResponseEntity<>(iProductService.searchProduct(name,productTypeId,producerId,minPrice,maxPrice,sortedPageaBle),HttpStatus.OK);
    }
    @GetMapping("detail")
    public ResponseEntity<?> detailProduct(@RequestParam(required = false)Integer id){
        if(iProductService.findByProduct(id)==null){
            return new ResponseEntity<>(new ResponseMessage("Sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
        }
        try {
            Integer.parseInt(String.valueOf(id));
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(new ResponseMessage("Id không hợp lệ"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(iProductService.findByProduct(id),HttpStatus.OK);
    }
    @GetMapping("sale-list")
    public ResponseEntity<?> productSaleList(){
        return new ResponseEntity<>(iProductService.productSaleList(),HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<?> productCreate(@RequestBody ProductCreateDTO productCreateDTO){
        Producer producer = iProducerService.findByProducerId(productCreateDTO.getProducerId());
        if (producer==null){
            return new ResponseEntity<>(new ResponseMessage("Tên thương hiệu không tồn tại" ),HttpStatus.BAD_REQUEST);
        }
        ProductType productType = iProductTypeService.findByProductTypeId(productCreateDTO.getProductTypeId());
        if (productType==null){
            return new ResponseEntity<>(new ResponseMessage("Tên loại sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
        }
        int id = iProductService.getTotalCodeAmount() + 1000;
        Product product = new Product();
        product.setCode("SP-" + id);
        product.setName(productCreateDTO.getName());
        product.setColor(productCreateDTO.getColor());
        product.setAddNewDate(productCreateDTO.getAddNewDate());
        product.setDescription(productCreateDTO.getDescription());
        product.setProductType(productType);
        product.setProducer(producer);
        product.setDelete(false);
        Product product1 = iProductService.productCreate(product);
        for ( String imageName : productCreateDTO.getImageSet()) {
            Image image = new Image();
            image.setName(imageName);
            image.setProduct(product1);
            iImageService.createImage(image);
        }
        for (CapacityProductDTO capacityProductDTO : productCreateDTO.getCapacityProductDTOS()) {
            CapacityProduct capacityProduct = new CapacityProduct();
            BeanUtils.copyProperties(capacityProductDTO,capacityProduct);
            capacityProduct.setPrice(capacityProductDTO.getPrice().equals("") ? null : capacityProductDTO.getPrice());
            capacityProduct.setProduct(product1);
            iCapacityProductService.capacityProductCreate(capacityProduct);
        }
        return new ResponseEntity<>("Thêm mới thành công",HttpStatus.CREATED);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProduct(@RequestParam(required = false) Integer id){
        Product product = iProductService.findByProduct(id);
       if(product==null) {
           return new ResponseEntity<>(new ResponseMessage("Sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
       }
       iProductService.deleteProduct(product);
       return new ResponseEntity<>(new ResponseMessage("Xóa sản phẩm thành công"),HttpStatus.OK);
    }
}
