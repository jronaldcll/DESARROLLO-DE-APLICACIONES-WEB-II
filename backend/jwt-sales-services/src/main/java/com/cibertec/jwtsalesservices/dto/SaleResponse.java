package com.cibertec.jwtsalesservices.dto;

public record SaleResponse(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId,
		String status
) {
}
