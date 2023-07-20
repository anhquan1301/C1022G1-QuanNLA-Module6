package com.example.exam.repository;

import com.example.exam.model.Tool;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IToolRepository extends JpaRepository<Tool,Integer> {
    @Query(value = "Select * from tool where (name LIKE CONCAT('%', :name, '%') OR producer LIKE CONCAT('%', :name, '%'))",nativeQuery = true)
    Page<Tool> findByNameTool(@Param("name")String name,
                              Pageable pageable);
    Boolean existsByCode(String code);
 }
