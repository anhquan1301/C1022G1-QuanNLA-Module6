package com.example.be.service.product.impl;

import com.example.be.model.Image;
import com.example.be.repository.product.IImageRepository;
import com.example.be.service.product.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService implements IImageService {
    @Autowired
    private IImageRepository iImageRepository;

    @Override
    public Image findByImageId(int id) {
        return iImageRepository.findById(id);
    }

    @Override
    public void createImage(Image image) {
        iImageRepository.save(image);
    }

}
