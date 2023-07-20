package com.example.exam.service;

import com.example.exam.model.Tool;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IToolService {
    Page<Tool> findByNameTool(String name, Pageable pageable);
    void toolCreate(Tool tool);
    Boolean existsByCode(String code);
}
