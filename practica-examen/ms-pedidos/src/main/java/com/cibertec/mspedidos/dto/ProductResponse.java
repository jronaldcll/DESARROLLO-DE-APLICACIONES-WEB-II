package com.cibertec.mspedidos.dto;

import java.math.BigDecimal;

public record ProductResponse(
		Long id,
		String name,
		BigDecimal price,
		Integer stock
) {
}
