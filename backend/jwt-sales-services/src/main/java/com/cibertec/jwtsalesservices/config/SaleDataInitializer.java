package com.cibertec.jwtsalesservices.config;

import com.cibertec.jwtsalesservices.entidades.Sale;
import com.cibertec.jwtsalesservices.repositorio.SaleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SaleDataInitializer {

	@Bean
	CommandLineRunner seedSales(SaleRepository saleRepository) {
		return args -> {
			if (saleRepository.count() > 0) {
				return;
			}

			saleRepository.save(new Sale(null, 1L, 2, 9001L, "COMPLETED"));
			saleRepository.save(new Sale(null, 2L, 3, 9002L, "COMPLETED"));
			saleRepository.save(new Sale(null, 3L, 1, 9003L, "PENDING"));
		};
	}
}
