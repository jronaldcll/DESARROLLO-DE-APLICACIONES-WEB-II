package com.cibertec.productsservices.rabbitmq;

public record StockLowAlertEvent(
		Long productId,
		Integer remainingStock,
		String message
) {
}
