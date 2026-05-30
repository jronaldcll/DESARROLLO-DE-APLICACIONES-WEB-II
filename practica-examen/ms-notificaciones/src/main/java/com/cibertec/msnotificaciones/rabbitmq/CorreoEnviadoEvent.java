package com.cibertec.msnotificaciones.rabbitmq;

import java.time.Instant;

public record CorreoEnviadoEvent(
		Long saleId,
		Long customerId,
		String correo,
		Long mensajeId,
		String asunto,
		String mensaje,
		Instant fechaEnvio
) {
}
