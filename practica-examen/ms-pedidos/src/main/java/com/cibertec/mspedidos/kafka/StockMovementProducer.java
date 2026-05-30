package com.cibertec.mspedidos.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

// @Component registra esta clase como dependencia de Spring.
// En AWS el equivalente práctico sería una pieza reutilizable dentro de una Lambda productora.
@Component
@ConditionalOnProperty(name = "messaging.kafka.enabled", havingValue = "true")
public class StockMovementProducer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockMovementProducer.class);

	private final KafkaTemplate<String, StockMovementEvent> kafkaTemplate;

	public StockMovementProducer(KafkaTemplate<String, StockMovementEvent> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	public void publish(StockMovementEvent event) {
		// Usar productId como key equivale a usar PartitionKey en Kinesis.
		// Eso garantiza que todos los movimientos del mismo producto caigan en la misma particion
		// y, por tanto, Kafka preserve el orden de esos eventos dentro de esa particion.
		String key = String.valueOf(event.productId());
		kafkaTemplate.send(KafkaTopicConfig.STOCK_MOVEMENTS_TOPIC, key, event);
		LOGGER.info("Evento publicado en Kafka. topic={}, key={}, payload={}",
				KafkaTopicConfig.STOCK_MOVEMENTS_TOPIC, key, event);
	}
}
