package com.cibertec.resiliencia.pedidos.dto;

public record StockResponse(
		Long productoId,
		String producto,
		Integer stock,
		Boolean disponible,
		String origen
) {
}
