package com.cibertec.salesservices.rabbitmq;

public record StockReserveEvent(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId
) {
}
