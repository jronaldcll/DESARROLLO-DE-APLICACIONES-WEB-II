package com.cibertec.productsservices.dto;

import java.math.BigDecimal;

public record ProductResponse(
		Long id,
		String name,
		BigDecimal price,
		Integer stock
) {
}
