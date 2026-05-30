package com.cibertec.msnotificaciones.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "correos_enviados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CorreoEnviado {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Long saleId;

	@Column(nullable = false)
	private Long customerId;

	@Column(nullable = false, length = 150)
	private String correo;

	@Column(nullable = false, length = 200)
	private String asunto;

	@Column(nullable = false, length = 1000)
	private String mensaje;

	@Column(nullable = false)
	private LocalDateTime fechaEnvio;
}
