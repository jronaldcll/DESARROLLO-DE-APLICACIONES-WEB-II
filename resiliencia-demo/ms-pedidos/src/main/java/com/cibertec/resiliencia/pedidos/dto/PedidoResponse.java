package com.cibertec.resiliencia.pedidos.dto;

public record PedidoResponse(
		Long pedidoId,
		Long productoId,
		Integer cantidad,
		Long clienteId,
		String estado,
		String mensaje,
		StockResponse inventario
) {
}
