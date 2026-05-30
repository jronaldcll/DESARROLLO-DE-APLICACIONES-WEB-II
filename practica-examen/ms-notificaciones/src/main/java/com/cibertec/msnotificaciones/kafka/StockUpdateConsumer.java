package com.cibertec.msnotificaciones.kafka;

import com.cibertec.msnotificaciones.negocio.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

// @Component registra este consumer dentro del contenedor de Spring.
// En AWS se parece a una Lambda suscrita a un stream de Kinesis.
@Component
@ConditionalOnProperty(name = "messaging.consumers.enabled", havingValue = "true")
public class StockUpdateConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(StockUpdateConsumer.class);

	private final ProductService productService;

	public StockUpdateConsumer(ProductService productService) {
		this.productService = productService;
	}

	// @KafkaListener crea un consumidor Kafka administrado por Spring.
	// El groupId representa un Consumer Group, similar a una aplicacion lectora dedicada sobre Kinesis.
	@KafkaListener(topics = "stock-movements", groupId = "stock-update-cg")
	public void handleStockMovement(StockMovementEvent event) {
		int remainingStock = productService.decreaseStock(event.productId(), event.quantity());
		LOGGER.info("[stock-update-cg] Stock actualizado. saleId={}, productId={}, quantity={}, remainingStock={}",
				event.saleId(), event.productId(), event.quantity(), remainingStock);
	}
}
