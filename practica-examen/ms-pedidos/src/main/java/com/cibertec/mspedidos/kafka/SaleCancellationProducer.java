package com.cibertec.mspedidos.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "messaging.kafka.enabled", havingValue = "true")
public class SaleCancellationProducer {

	private static final Logger LOGGER = LoggerFactory.getLogger(SaleCancellationProducer.class);

	private final KafkaTemplate<String, SaleCancellationRequestedEvent> kafkaTemplate;

	public SaleCancellationProducer(KafkaTemplate<String, SaleCancellationRequestedEvent> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	public void publish(SaleCancellationRequestedEvent event) {
		String key = String.valueOf(event.saleId());
		kafkaTemplate.send(KafkaTopicConfig.SALE_CANCELLATION_REQUESTS_TOPIC, key, event);
		LOGGER.info("Solicitud de anulacion publicada en Kafka. topic={}, key={}, payload={}",
				KafkaTopicConfig.SALE_CANCELLATION_REQUESTS_TOPIC, key, event);
	}
}
