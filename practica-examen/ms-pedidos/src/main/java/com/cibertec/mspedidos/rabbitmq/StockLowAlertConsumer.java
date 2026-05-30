package com.cibertec.mspedidos.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

// @Component registra este consumidor en el contenedor Spring.
// En AWS sería similar a una Lambda disparada por una cola SQS.
@Component
@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
public class StockLowAlertConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockLowAlertConsumer.class);

	// @RabbitListener crea un listener sobre la cola indicada.
	// En AWS esto equivale al trigger de SQS sobre una Lambda consumidora.
	@RabbitListener(queues = RabbitMQConfig.STOCK_LOW_QUEUE)
	public void onStockLow(StockLowAlertEvent event) {
		LOGGER.warn("[ms-pedidos] Alerta de stock bajo recibida: {}", event);
	}
}
