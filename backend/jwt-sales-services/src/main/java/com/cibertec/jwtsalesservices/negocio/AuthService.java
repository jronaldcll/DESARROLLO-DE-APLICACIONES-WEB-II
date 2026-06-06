package com.cibertec.jwtsalesservices.negocio;

import com.cibertec.jwtsalesservices.dto.LoginRequest;
import com.cibertec.jwtsalesservices.dto.LoginResponse;
import com.cibertec.jwtsalesservices.entidades.AppUser;
import com.cibertec.jwtsalesservices.repositorio.AppUserRepository;
import com.cibertec.jwtsalesservices.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

	private final AppUserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthService(
			AppUserRepository appUserRepository,
			PasswordEncoder passwordEncoder,
			JwtService jwtService
	) {
		this.appUserRepository = appUserRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	public LoginResponse login(LoginRequest request) {
		AppUser user = appUserRepository.findByUsername(request.username())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales invalidas"));

		if (!passwordEncoder.matches(request.password(), user.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales invalidas");
		}

		return new LoginResponse(jwtService.generateToken(user), "Bearer", jwtService.getExpirationMinutes());
	}
}
