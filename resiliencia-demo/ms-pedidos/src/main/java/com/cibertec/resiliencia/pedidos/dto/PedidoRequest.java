package com.cibertec.resiliencia.pedidos.dto;

public record PedidoRequest(
		Long productoId,
		Integer cantidad,
		Long clienteId
) {
}
