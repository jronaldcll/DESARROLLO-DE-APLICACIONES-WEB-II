package com.cibertec.msnotificaciones.negocio;

import com.cibertec.msnotificaciones.entidades.CorreoEnviado;
import com.cibertec.msnotificaciones.rabbitmq.CorreoEnviadoEvent;
import com.cibertec.msnotificaciones.repositorio.CorreoEnviadoRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class CorreoEnviadoService {

	private final CorreoEnviadoRepository correoEnviadoRepository;

	public CorreoEnviadoService(CorreoEnviadoRepository correoEnviadoRepository) {
		this.correoEnviadoRepository = correoEnviadoRepository;
	}

	public CorreoEnviado registrarCorreoEnviado(CorreoEnviadoEvent event) {
		CorreoEnviado correoEnviado = CorreoEnviado.builder()
				.saleId(event.saleId())
				.customerId(event.customerId())
				.correo(event.correo())
				.asunto(event.asunto())
				.mensaje(event.mensaje())
				.fechaEnvio(toLocalDateTime(event.fechaEnvio()))
				.build();

		return correoEnviadoRepository.save(correoEnviado);
	}

	private LocalDateTime toLocalDateTime(Instant fechaEnvio) {
		if (fechaEnvio == null) {
			return LocalDateTime.now();
		}

		return LocalDateTime.ofInstant(fechaEnvio, ZoneId.systemDefault());
	}
}
