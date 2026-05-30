package com.cibertec.mspedidos.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "messaging.rabbitmq.enabled", havingValue = "true")
public class PurchaseEmailProducer {

	private static final Logger LOGGER = LoggerFactory.getLogger(PurchaseEmailProducer.class);

	private final RabbitTemplate rabbitTemplate;

	public PurchaseEmailProducer(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public void publish(PurchaseEmailEvent event) {
		rabbitTemplate.convertAndSend(
				RabbitMQConfig.NOTIFICATION_EXCHANGE,
				RabbitMQConfig.PURCHASE_EMAIL_ROUTING_KEY,
				event
		);
		LOGGER.info("Correo de compra publicado en RabbitMQ. exchange={}, routingKey={}, payload={}",
				RabbitMQConfig.NOTIFICATION_EXCHANGE, RabbitMQConfig.PURCHASE_EMAIL_ROUTING_KEY, event);
	}
}
