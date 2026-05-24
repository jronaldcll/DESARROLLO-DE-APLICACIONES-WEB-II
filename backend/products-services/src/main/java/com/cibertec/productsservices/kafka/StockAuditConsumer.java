package com.cibertec.productsservices.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

// @Component registra este consumidor de auditoria.
// En AWS esto equivale a otro proceso consumidor independiente sobre Kinesis.
@Component
public class StockAuditConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockAuditConsumer.class);

	// @KafkaListener con groupId propio hace que auditoria tenga su propio offset y pueda reprocesar eventos aparte.
	// Eso se parece a un consumidor independiente que mantiene su propio progreso dentro del stream.
	@KafkaListener(topics = "stock-movements", groupId = "audit-cg")
	public void handleAudit(StockMovementEvent event) {
		LOGGER.info("[audit-cg] Auditoria completa del evento: {}", event);
	}
}
