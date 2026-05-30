package com.cibertec.msnotificaciones.rabbitmq;

public record StockReserveEvent(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId
) {
}
