package com.example.be.repository.product;

import com.example.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IProductRepository extends JpaRepository<Product,Integer> {
    @Query(value = "SELECT * FROM product WHERE (name LIKE concat ('%' , :name ," +
            "'%')AND product_type_id LIKE concat ('%' , :productTypeId , '%') " +
            "AND producer_id LIKE concat ('%' , :producerId , '%'))", nativeQuery = true)
    Page<Product> searchProduct(@Param("name") String name,
                         @Param("productTypeId") String productTypeId,
                                @Param("producerId") String producerId,
                         Pageable pageable);
    Product findById(int id);
}
