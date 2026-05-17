package com.cibertec.salesservices.dto;

import java.math.BigDecimal;

public record SaleResponse(
		Long saleId,
		Integer quantity,
		BigDecimal total,
		ProductResponse product
) {
}
