package com.cibertec.mspedidos.rabbitmq;

public record StockLowAlertEvent(
		Long productId,
		Integer remainingStock,
		String message
) {
}
