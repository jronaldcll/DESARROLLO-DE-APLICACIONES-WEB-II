package com.cibertec.productsservices.repositorio;

import com.cibertec.productsservices.entidades.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
