package com.cibertec.mspedidos.client;

import com.cibertec.mspedidos.dto.MensajeNotificacionResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
		name = "ms-notificaciones",
		contextId = "notificationClient",
		url = "${notificaciones.base-url:http://localhost:8081}"
)
public interface NotificationClient {

	@GetMapping("/notificaciones/mensajes/{mensajeId}")
	MensajeNotificacionResponse getMensajeById(@PathVariable("mensajeId") Long mensajeId);
}
