package com.cibertec.salesservices.dto;

import java.math.BigDecimal;

public record ProductResponse(
		Long id,
		String name,
		BigDecimal price,
		Integer stock
) {
}
