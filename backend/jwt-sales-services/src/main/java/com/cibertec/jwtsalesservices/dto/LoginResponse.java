package com.cibertec.jwtsalesservices.dto;

public record LoginResponse(
		String token,
		String tokenType,
		Long expiresInMinutes
) {
}
