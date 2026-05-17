package com.cibertec.salesservices.entidades;

import lombok.Builder;

@Builder
public record Sale(
		Long saleId,
		Long productId,
		Integer quantity
) {
}
