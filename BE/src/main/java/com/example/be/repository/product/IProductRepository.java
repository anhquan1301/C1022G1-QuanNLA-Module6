package com.example.be.repository.product;

import com.example.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.math.BigInteger;

public interface IProductRepository extends JpaRepository<Product,Integer> {
    @Query(value = "SELECT *\n" +
            "FROM product p\n" +
            "JOIN (\n" +
            "    SELECT product_id, MIN(price_sale) AS min_price_sale\n" +
            "    FROM capacity_product\n" +
            "    GROUP BY product_id\n" +
            ") AS min_prices ON min_prices.product_id = p.id\n" +
            "JOIN capacity_product cp ON cp.product_id = p.id AND cp.price_sale = min_prices.min_price_sale\n" +
            "WHERE p.name LIKE CONCAT('%', :name, '%')\n" +
            "    AND p.product_type_id LIKE CONCAT('%', :productTypeId, '%')\n" +
            "    AND p.producer_id LIKE CONCAT('%', :producerId, '%')\n" +
            "    AND cp.price_sale >= :minPrice\n" +
            "    AND cp.price_sale <= :maxPrice", nativeQuery = true)
    Page<Product> searchProduct(@Param("name") String name,
                                @Param("productTypeId") String productTypeId,
                                @Param("producerId") String producerId,
                                @Param("minPrice") Long minPrice,
                                @Param("maxPrice") Long maxPrice,
                                Pageable pageable);
    Product findById(int id);
}
