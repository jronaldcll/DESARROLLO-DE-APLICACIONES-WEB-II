package com.cibertec.mspedidos.repositorio;

import com.cibertec.mspedidos.entidades.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
