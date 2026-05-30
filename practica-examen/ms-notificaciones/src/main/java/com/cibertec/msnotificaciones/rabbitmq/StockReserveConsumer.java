package com.cibertec.msnotificaciones.rabbitmq;

import com.cibertec.msnotificaciones.negocio.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

// @Component registra el consumidor de reservas en Spring.
// En AWS esto se parece a una Lambda activada por mensajes de SQS.
@Component
@ConditionalOnProperty(name = "messaging.consumers.enabled", havingValue = "true")
public class StockReserveConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockReserveConsumer.class);

	private final ProductService productService;
	private final StockLowAlertProducer stockLowAlertProducer;

	public StockReserveConsumer(ProductService productService, StockLowAlertProducer stockLowAlertProducer) {
		this.productService = productService;
		this.stockLowAlertProducer = stockLowAlertProducer;
	}

	// @RabbitListener conecta la cola con este método consumidor.
	// En AWS equivale al trigger de una cola SQS sobre una Lambda.
	@RabbitListener(queues = RabbitMQConfig.STOCK_RESERVE_QUEUE)
	public void onStockReserve(StockReserveEvent event) {
		int remainingStock = productService.decreaseStock(event.productId(), event.quantity());
		LOGGER.info("[ms-notificaciones] Reserva procesada. saleId={}, productId={}, quantity={}, remainingStock={}",
				event.saleId(), event.productId(), event.quantity(), remainingStock);

		if (remainingStock < 5) {
			stockLowAlertProducer.publish(new StockLowAlertEvent(
					event.productId(),
					remainingStock,
					"El producto " + event.productId() + " quedo con stock bajo tras la venta " + event.saleId()
			));
		}
	}
}
