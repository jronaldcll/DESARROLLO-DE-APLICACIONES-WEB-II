package com.cibertec.jwtsalesservices.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(
		@NotBlank String username,
		@NotBlank @Email String email,
		@NotBlank @Size(min = 6) String password,
		String role
) {
}
