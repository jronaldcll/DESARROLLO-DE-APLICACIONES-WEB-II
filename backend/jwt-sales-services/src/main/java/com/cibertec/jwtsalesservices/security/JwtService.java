package com.cibertec.jwtsalesservices.security;

import com.cibertec.jwtsalesservices.entidades.AppUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

	private final SecretKey secretKey;
	private final long expirationMinutes;

	public JwtService(
			@Value("${app.jwt.secret}") String secret,
			@Value("${app.jwt.expiration-minutes}") long expirationMinutes
	) {
		this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.expirationMinutes = expirationMinutes;
	}

	public String generateToken(AppUser user) {
		Instant now = Instant.now();

		return Jwts.builder()
				.subject(user.getUsername())
				.claim("userId", user.getId())
				.claim("role", user.getRole())
				.issuedAt(Date.from(now))
				.expiration(Date.from(now.plusSeconds(expirationMinutes * 60)))
				.signWith(secretKey)
				.compact();
	}

	public String extractUsername(String token) {
		return parseClaims(token).getSubject();
	}

	public boolean isTokenValid(String token) {
		return parseClaims(token).getExpiration().after(new Date());
	}

	public long getExpirationMinutes() {
		return expirationMinutes;
	}

	private Claims parseClaims(String token) {
		return Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
}
