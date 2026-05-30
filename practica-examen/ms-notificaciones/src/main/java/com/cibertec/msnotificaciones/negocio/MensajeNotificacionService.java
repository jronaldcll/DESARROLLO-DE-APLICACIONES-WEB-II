package com.cibertec.msnotificaciones.negocio;

import com.cibertec.msnotificaciones.dto.MensajeNotificacionResponse;
import com.cibertec.msnotificaciones.entidades.MensajeNotificacion;
import com.cibertec.msnotificaciones.repositorio.MensajeNotificacionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MensajeNotificacionService {

	private final MensajeNotificacionRepository mensajeNotificacionRepository;

	public MensajeNotificacionService(MensajeNotificacionRepository mensajeNotificacionRepository) {
		this.mensajeNotificacionRepository = mensajeNotificacionRepository;
	}

	public MensajeNotificacionResponse registrarMensaje(MensajeNotificacion mensajeNotificacion) {
		if (mensajeNotificacion.getActivo() == null) {
			mensajeNotificacion.setActivo(Boolean.TRUE);
		}
		return mapToResponse(mensajeNotificacionRepository.save(mensajeNotificacion));
	}

	public MensajeNotificacionResponse getMensajeActivoById(Long id) {
		MensajeNotificacion mensajeNotificacion = mensajeNotificacionRepository.findByIdAndActivoTrue(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mensaje no encontrado"));

		return mapToResponse(mensajeNotificacion);
	}

	private MensajeNotificacionResponse mapToResponse(MensajeNotificacion mensajeNotificacion) {
		return new MensajeNotificacionResponse(
				mensajeNotificacion.getId(),
				mensajeNotificacion.getNombre(),
				mensajeNotificacion.getActivo()
		);
	}
}
