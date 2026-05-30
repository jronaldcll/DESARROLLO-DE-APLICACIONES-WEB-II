package com.cibertec.msnotificaciones.repositorio;

import com.cibertec.msnotificaciones.entidades.SaleCancellationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleCancellationLogRepository extends JpaRepository<SaleCancellationLog, Long> {

	List<SaleCancellationLog> findBySaleIdOrderByCreatedAtDesc(Long saleId);
}
