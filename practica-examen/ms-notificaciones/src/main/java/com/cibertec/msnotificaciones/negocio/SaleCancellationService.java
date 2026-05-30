package com.cibertec.msnotificaciones.negocio;

import com.cibertec.msnotificaciones.dto.SaleCancellationLogResponse;
import com.cibertec.msnotificaciones.entidades.Sale;
import com.cibertec.msnotificaciones.entidades.SaleCancellationLog;
import com.cibertec.msnotificaciones.kafka.SaleCancellationRequestedEvent;
import com.cibertec.msnotificaciones.repositorio.SaleCancellationLogRepository;
import com.cibertec.msnotificaciones.repositorio.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleCancellationService {

	private static final String STATUS_ACTIVE = "ACTIVE";
	private static final String STATUS_CANCELLED = "CANCELLED";
	private static final String RESULT_APPROVED = "APPROVED";
	private static final String RESULT_REJECTED = "REJECTED";

	private final SaleRepository saleRepository;
	private final SaleCancellationLogRepository saleCancellationLogRepository;

	public SaleCancellationService(
			SaleRepository saleRepository,
			SaleCancellationLogRepository saleCancellationLogRepository
	) {
		this.saleRepository = saleRepository;
		this.saleCancellationLogRepository = saleCancellationLogRepository;
	}

	@Transactional
	public void confirmCancellation(SaleCancellationRequestedEvent event) {
		Sale sale = saleRepository.findById(event.saleId()).orElse(null);
		if (sale == null) {
			registerLog(event.saleId(), event.currentStatus(), "NOT_FOUND", RESULT_REJECTED,
					"No se anulo la venta porque no existe en la base de datos");
			return;
		}

		String previousStatus = sale.getStatus();
		if (STATUS_ACTIVE.equalsIgnoreCase(previousStatus)) {
			registerLog(sale.getSaleId(), previousStatus, previousStatus, RESULT_REJECTED,
					"No se anulo la venta porque se encuentra activa");
			return;
		}

		if (STATUS_CANCELLED.equalsIgnoreCase(previousStatus)) {
			registerLog(sale.getSaleId(), previousStatus, previousStatus, RESULT_REJECTED,
					"No se anulo la venta porque ya estaba anulada");
			return;
		}

		sale.setStatus(STATUS_CANCELLED);
		saleRepository.save(sale);
		registerLog(sale.getSaleId(), previousStatus, STATUS_CANCELLED, RESULT_APPROVED,
				"Venta anulada correctamente por confirmacion de ms-notificaciones");
	}

	public List<SaleCancellationLogResponse> getLogsBySaleId(Long saleId) {
		return saleCancellationLogRepository.findBySaleIdOrderByCreatedAtDesc(saleId).stream()
				.map(this::mapToResponse)
				.toList();
	}

	private void registerLog(
			Long saleId,
			String previousStatus,
			String resultingStatus,
			String result,
			String detail
	) {
		saleCancellationLogRepository.save(SaleCancellationLog.builder()
				.saleId(saleId)
				.previousStatus(previousStatus)
				.resultingStatus(resultingStatus)
				.result(result)
				.detail(detail)
				.createdAt(LocalDateTime.now())
				.build());
	}

	private SaleCancellationLogResponse mapToResponse(SaleCancellationLog log) {
		return new SaleCancellationLogResponse(
				log.getId(),
				log.getSaleId(),
				log.getPreviousStatus(),
				log.getResultingStatus(),
				log.getResult(),
				log.getDetail(),
				log.getCreatedAt()
		);
	}
}
