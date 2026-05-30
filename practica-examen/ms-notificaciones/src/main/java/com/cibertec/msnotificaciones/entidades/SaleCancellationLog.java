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
@Table(name = "sale_cancellation_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleCancellationLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Long saleId;

	@Column(nullable = false, length = 30)
	private String previousStatus;

	@Column(nullable = false, length = 30)
	private String resultingStatus;

	@Column(nullable = false, length = 30)
	private String result;

	@Column(nullable = false, length = 500)
	private String detail;

	@Column(nullable = false)
	private LocalDateTime createdAt;
}
