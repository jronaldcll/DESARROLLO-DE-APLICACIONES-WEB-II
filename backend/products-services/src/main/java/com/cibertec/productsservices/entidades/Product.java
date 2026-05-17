package com.cibertec.productsservices.entidades;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record Product(
		Long id,
		String name,
		BigDecimal price,
		Integer stock
) {
}
