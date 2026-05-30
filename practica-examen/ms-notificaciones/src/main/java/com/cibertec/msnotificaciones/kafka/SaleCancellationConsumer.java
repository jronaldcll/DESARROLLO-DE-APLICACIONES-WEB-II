package com.cibertec.msnotificaciones.kafka;

import com.cibertec.msnotificaciones.negocio.SaleCancellationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "messaging.consumers.enabled", havingValue = "true")
public class SaleCancellationConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(SaleCancellationConsumer.class);

	private final SaleCancellationService saleCancellationService;

	public SaleCancellationConsumer(SaleCancellationService saleCancellationService) {
		this.saleCancellationService = saleCancellationService;
	}

	@KafkaListener(
			topics = "sale-cancellation-requests",
			groupId = "sale-cancellation-cg",
			containerFactory = "saleCancellationKafkaListenerContainerFactory"
	)
	public void handleSaleCancellationRequest(SaleCancellationRequestedEvent event) {
		saleCancellationService.confirmCancellation(event);
		LOGGER.info("[sale-cancellation-cg] Solicitud de anulacion procesada. saleId={}, customerId={}, status={}",
				event.saleId(), event.customerId(), event.currentStatus());
	}
}
