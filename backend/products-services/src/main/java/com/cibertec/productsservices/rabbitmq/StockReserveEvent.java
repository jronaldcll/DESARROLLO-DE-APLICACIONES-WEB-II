package com.cibertec.productsservices.rabbitmq;

public record StockReserveEvent(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId
) {
}
