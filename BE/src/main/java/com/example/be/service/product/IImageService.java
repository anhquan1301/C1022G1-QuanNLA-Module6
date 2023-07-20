package com.example.be.service.product;

import com.example.be.model.Image;

public interface IImageService {
    Image findByImageId(int id);
    void createImage(Image image);
}
