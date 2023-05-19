package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String name;
    private String color;
    private String capacity;
    private String status;
    @Column(columnDefinition = "BIGINT")
    private String price;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "DATE")
    private String addNewDate;
    @Column(columnDefinition = "INT")
    private String quantity;
    @ManyToOne
    @JoinColumn(columnDefinition = "id")
    private ProductType productType;
    @ManyToOne
    @JoinColumn(columnDefinition = "id")
    private Producer producer;
    @JsonBackReference
    @OneToMany(mappedBy = "product")
    private Set<Image> imageSet = new HashSet<>();
    @JsonBackReference
    @OneToMany(mappedBy = "product")
    private Set<OderDetail> oderDetails = new HashSet<>();

    public Product() {
    }

    public Set<OderDetail> getOderDetails() {
        return oderDetails;
    }

    public void setOderDetails(Set<OderDetail> oderDetails) {
        this.oderDetails = oderDetails;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddNewDate() {
        return addNewDate;
    }

    public void setAddNewDate(String addNewDate) {
        this.addNewDate = addNewDate;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Producer getProducer() {
        return producer;
    }

    public void setProducer(Producer producer) {
        this.producer = producer;
    }

    public Set<Image> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<Image> imageSet) {
        this.imageSet = imageSet;
    }
}
