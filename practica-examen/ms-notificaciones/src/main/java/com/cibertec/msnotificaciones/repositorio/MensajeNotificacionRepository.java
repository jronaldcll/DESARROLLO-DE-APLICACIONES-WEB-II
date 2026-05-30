package com.cibertec.msnotificaciones.repositorio;

import com.cibertec.msnotificaciones.entidades.MensajeNotificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MensajeNotificacionRepository extends JpaRepository<MensajeNotificacion, Long> {

	Optional<MensajeNotificacion> findByIdAndActivoTrue(Long id);
}
