package com.cibertec.salesservices.dto;

import java.math.BigDecimal;

public record SaleWithProductResponse(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId,
		String status,
		BigDecimal total,
		ProductResponse product
) {
}
