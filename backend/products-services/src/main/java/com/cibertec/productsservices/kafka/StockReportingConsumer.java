package com.cibertec.productsservices.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

// @Component registra este procesador de reportes.
// En AWS sería equivalente a otra Lambda consumiendo el mismo stream con su propio checkpoint.
@Component
public class StockReportingConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockReportingConsumer.class);

	// @KafkaListener con otro groupId permite que este consumer reciba el mismo evento de forma independiente.
	// En AWS se parece a un consumidor separado del stream con su propio estado de lectura.
	@KafkaListener(topics = "stock-movements", groupId = "reporting-cg")
	public void handleReport(StockMovementEvent event) {
		LOGGER.info("[reporting-cg] Reporte de movimiento. saleId={}, productId={}, quantity={}, customerId={}, timestamp={}",
				event.saleId(), event.productId(), event.quantity(), event.customerId(), event.timestamp());
	}
}
