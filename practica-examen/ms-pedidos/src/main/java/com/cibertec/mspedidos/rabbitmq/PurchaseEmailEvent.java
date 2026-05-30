package com.cibertec.mspedidos.rabbitmq;

import java.time.Instant;

public record PurchaseEmailEvent(
		Long saleId,
		Long customerId,
		String correo,
		Long mensajeId,
		String asunto,
		String mensaje,
		Instant fechaEnvio
) {
}
