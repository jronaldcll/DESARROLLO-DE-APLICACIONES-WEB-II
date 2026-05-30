package com.cibertec.msnotificaciones.repositorio;

import com.cibertec.msnotificaciones.entidades.CorreoEnviado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorreoEnviadoRepository extends JpaRepository<CorreoEnviado, Long> {
}
