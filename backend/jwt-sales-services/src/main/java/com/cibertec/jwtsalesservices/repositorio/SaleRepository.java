package com.cibertec.jwtsalesservices.repositorio;

import com.cibertec.jwtsalesservices.entidades.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
