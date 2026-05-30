package com.cibertec.msnotificaciones.dto;

import java.time.LocalDateTime;

public record SaleCancellationLogResponse(
		Long id,
		Long saleId,
		String previousStatus,
		String resultingStatus,
		String result,
		String detail,
		LocalDateTime createdAt
) {
}
