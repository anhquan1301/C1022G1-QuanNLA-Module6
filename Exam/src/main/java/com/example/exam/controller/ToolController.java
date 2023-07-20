package com.example.exam.controller;

import com.example.exam.dto.ToolCreateDTO;
import com.example.exam.model.Tool;
import com.example.exam.service.IToolService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/tool")
public class ToolController {
    @Autowired
    private IToolService iToolService;
    @GetMapping("")
    public ResponseEntity<?> findByNameAndProducetTool(@RequestParam(required = false,defaultValue = "")String name,
                                                       @PageableDefault(sort = {"id"},direction = Sort.Direction.DESC,size = 3)Pageable pageable){
        return new ResponseEntity<>(iToolService.findByNameTool(name,pageable), HttpStatus.OK);
    }
    @PostMapping("")
    public ResponseEntity<?> toolCreate(@Validated @RequestBody ToolCreateDTO toolCreateDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        Tool tool = new Tool();
        BeanUtils.copyProperties(toolCreateDTO,tool);
        if(iToolService.existsByCode(toolCreateDTO.getCode())){
            return new ResponseEntity<>("Mã công cụ đã tồn tại",HttpStatus.BAD_REQUEST);
        }
        iToolService.toolCreate(tool);
        return new ResponseEntity<>("Thêm mới thành công",HttpStatus.CREATED);
    }
}
