package com.cibertec.jwtsalesservices.negocio;

import com.cibertec.jwtsalesservices.dto.UserRequest;
import com.cibertec.jwtsalesservices.dto.UserResponse;
import com.cibertec.jwtsalesservices.entidades.AppUser;
import com.cibertec.jwtsalesservices.repositorio.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

	private final AppUserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
		this.appUserRepository = appUserRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public UserResponse createUser(UserRequest request) {
		if (appUserRepository.existsByUsername(request.username())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "El username ya existe");
		}
		if (appUserRepository.existsByEmail(request.email())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya existe");
		}

		AppUser user = new AppUser(
				null,
				request.username(),
				request.email(),
				passwordEncoder.encode(request.password()),
				normalizeRole(request.role())
		);

		return mapToResponse(appUserRepository.save(user));
	}

	public List<UserResponse> getAllUsers() {
		return appUserRepository.findAll().stream()
				.map(this::mapToResponse)
				.toList();
	}

	public UserResponse updateUser(Long id, UserRequest request) {
		AppUser currentUser = appUserRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

		currentUser.setUsername(request.username());
		currentUser.setEmail(request.email());
		currentUser.setPassword(passwordEncoder.encode(request.password()));
		currentUser.setRole(normalizeRole(request.role()));

		return mapToResponse(appUserRepository.save(currentUser));
	}

	public void deleteUser(Long id) {
		if (!appUserRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
		}
		appUserRepository.deleteById(id);
	}

	private String normalizeRole(String role) {
		if (role == null || role.isBlank()) {
			return "USER";
		}
		return role.trim().toUpperCase();
	}

	private UserResponse mapToResponse(AppUser user) {
		return new UserResponse(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				user.getRole()
		);
	}
}
