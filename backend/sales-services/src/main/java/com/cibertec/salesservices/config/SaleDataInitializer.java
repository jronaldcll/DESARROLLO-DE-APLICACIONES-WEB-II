package com.cibertec.salesservices.config;

import com.cibertec.salesservices.entidades.Sale;
import com.cibertec.salesservices.repositorio.SaleRepository;
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

			saleRepository.save(Sale.builder()
					.productId(1L)
					.quantity(2)
					.customerId(9001L)
					.status("COMPLETED")
					.build());
			saleRepository.save(Sale.builder()
					.productId(2L)
					.quantity(3)
					.customerId(9002L)
					.status("COMPLETED")
					.build());
		};
	}
}
