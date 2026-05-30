package com.cibertec.msnotificaciones.rabbitmq;

public record StockLowAlertEvent(
		Long productId,
		Integer remainingStock,
		String message
) {
}
