package com.cibertec.productsservices.kafka;

import java.time.Instant;

public record StockMovementEvent(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId,
		Instant timestamp
) {
}
