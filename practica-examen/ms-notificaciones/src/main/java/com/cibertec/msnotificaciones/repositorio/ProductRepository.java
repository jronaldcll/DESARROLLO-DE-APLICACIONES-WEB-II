package com.cibertec.msnotificaciones.repositorio;

import com.cibertec.msnotificaciones.entidades.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
