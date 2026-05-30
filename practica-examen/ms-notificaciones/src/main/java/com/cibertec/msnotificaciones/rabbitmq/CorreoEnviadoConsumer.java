package com.cibertec.msnotificaciones.rabbitmq;

import com.cibertec.msnotificaciones.entidades.CorreoEnviado;
import com.cibertec.msnotificaciones.negocio.CorreoEnviadoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "messaging.consumers.enabled", havingValue = "true")
public class CorreoEnviadoConsumer {

	private static final Logger LOGGER = LoggerFactory.getLogger(CorreoEnviadoConsumer.class);

	private final CorreoEnviadoService correoEnviadoService;

	public CorreoEnviadoConsumer(CorreoEnviadoService correoEnviadoService) {
		this.correoEnviadoService = correoEnviadoService;
	}

	@RabbitListener(queues = RabbitMQConfig.PURCHASE_EMAIL_QUEUE)
	public void onCorreoEnviado(CorreoEnviadoEvent event) {
		CorreoEnviado correoEnviado = correoEnviadoService.registrarCorreoEnviado(event);
		LOGGER.info("[ms-notificaciones] Correo registrado. id={}, saleId={}, customerId={}, correo={}",
				correoEnviado.getId(), event.saleId(), event.customerId(), event.correo());
	}
}
