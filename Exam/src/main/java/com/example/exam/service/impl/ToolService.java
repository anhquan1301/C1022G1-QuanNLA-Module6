package com.example.exam.service.impl;

import com.example.exam.model.Tool;
import com.example.exam.repository.IToolRepository;
import com.example.exam.service.IToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ToolService implements IToolService {
    @Autowired
    private IToolRepository iToolRepository;
    @Override
    public Page<Tool> findByNameTool(String name, Pageable pageable) {
        return iToolRepository.findByNameTool(name,pageable);
    }

    @Override
    public void toolCreate(Tool tool) {
        iToolRepository.save(tool);
    }

    @Override
    public Boolean existsByCode(String code) {
        return iToolRepository.existsByCode(code);
    }
}
