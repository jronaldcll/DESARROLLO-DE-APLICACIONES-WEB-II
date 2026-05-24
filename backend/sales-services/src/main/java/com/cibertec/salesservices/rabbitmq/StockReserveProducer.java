package com.cibertec.salesservices.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

// @Component registra un productor reutilizable en Spring.
// En AWS sería equivalente a código publicador hacia SNS o SQS desde una Lambda.
@Component
public class StockReserveProducer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockReserveProducer.class);

	private final RabbitTemplate rabbitTemplate;

	public StockReserveProducer(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public void publish(StockReserveEvent event) {
		rabbitTemplate.convertAndSend(
				RabbitMQConfig.STOCK_EXCHANGE,
				RabbitMQConfig.STOCK_RESERVE_ROUTING_KEY,
				event
		);
		LOGGER.info("Evento RabbitMQ publicado. exchange={}, routingKey={}, payload={}",
				RabbitMQConfig.STOCK_EXCHANGE, RabbitMQConfig.STOCK_RESERVE_ROUTING_KEY, event);
	}
}
