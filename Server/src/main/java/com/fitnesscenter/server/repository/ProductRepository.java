package com.fitnesscenter.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitnesscenter.server.models.ProductDTO;

public interface ProductRepository extends JpaRepository<ProductDTO, Integer> {

    ProductDTO findByName(String name);
    List<ProductDTO> findAllByName(String name);
}
