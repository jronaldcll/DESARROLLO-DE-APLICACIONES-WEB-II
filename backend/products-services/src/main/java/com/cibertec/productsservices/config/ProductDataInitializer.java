package com.cibertec.productsservices.config;

import com.cibertec.productsservices.entidades.Product;
import com.cibertec.productsservices.repositorio.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class ProductDataInitializer {

	@Bean
	CommandLineRunner seedProducts(ProductRepository productRepository) {
		return args -> {
			if (productRepository.count() > 0) {
				return;
			}

			productRepository.save(Product.builder()
					.name("Laptop Lenovo")
					.price(new BigDecimal("3500.00"))
					.stock(10)
					.build());
			productRepository.save(Product.builder()
					.name("Mouse Logitech")
					.price(new BigDecimal("120.00"))
					.stock(25)
					.build());
		};
	}
}
