package com.cibertec.resiliencia.inventario.dto;

public record StockResponse(
		Long productoId,
		String producto,
		Integer stock,
		Boolean disponible,
		String origen
) {
}
