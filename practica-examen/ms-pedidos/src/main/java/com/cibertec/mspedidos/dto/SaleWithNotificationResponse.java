package com.cibertec.mspedidos.dto;

public record SaleWithNotificationResponse(
		Long saleId,
		Long productId,
		Integer quantity,
		Long customerId,
		String status,
		MensajeNotificacionResponse mensaje
) {
}
