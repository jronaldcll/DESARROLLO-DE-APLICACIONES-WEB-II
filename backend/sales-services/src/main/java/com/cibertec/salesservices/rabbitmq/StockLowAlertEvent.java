package com.cibertec.salesservices.rabbitmq;

public record StockLowAlertEvent(
		Long productId,
		Integer remainingStock,
		String message
) {
}
