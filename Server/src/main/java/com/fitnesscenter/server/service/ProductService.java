package com.fitnesscenter.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitnesscenter.server.models.ProductDTO;
import com.fitnesscenter.server.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;
    

    public ProductDTO saveProduct(ProductDTO product){
        return repository.save(product);
    }

    public List<ProductDTO> saveProducts(List<ProductDTO> products){
        return repository.saveAll(products);
    }

    public List<ProductDTO> getProducts(){
        return repository.findAll();
    }
    
    public ProductDTO getProducById(int id){
        return repository.findById(id).orElse(null);
    }
     public ProductDTO getProducByName(String name){
        return repository.findByName(name);
    }

     public List<ProductDTO> getProductsByName(String name){
        return repository.findAllByName(name);
    }

    public String deleteProduct(int id){
        repository.deleteById(id);
        return "Product remove! "+id;
    }
    public ProductDTO updateProductById(int id,ProductDTO product){
        ProductDTO existingProduct=repository.findById(id).orElse(null);
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantityAvailable(product.getQuantityAvailable());
        existingProduct.setFlavor(product.getFlavor());
        return repository.save(existingProduct);
    }


}
