package com.cibertec.mspedidos.rabbitmq;

public record StockReserveEvent(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId
) {
}
