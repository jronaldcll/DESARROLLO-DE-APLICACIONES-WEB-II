package com.cibertec.mspedidos.dto;

public record SaleRequest(
		Long productId,
		Integer quantity,
		Long customerId
) {
}
