package com.cibertec.jwtsalesservices.repositorio;

import com.cibertec.jwtsalesservices.entidades.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

	Optional<AppUser> findByUsername(String username);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);
}
