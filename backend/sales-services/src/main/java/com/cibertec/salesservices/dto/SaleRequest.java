package com.cibertec.salesservices.dto;

public record SaleRequest(
		Long productId,
		Integer quantity,
		Long customerId
) {
}
