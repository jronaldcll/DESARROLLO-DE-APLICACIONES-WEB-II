package com.cibertec.jwtsalesservices.dto;

public record UserResponse(
		Long id,
		String username,
		String email,
		String role
) {
}
