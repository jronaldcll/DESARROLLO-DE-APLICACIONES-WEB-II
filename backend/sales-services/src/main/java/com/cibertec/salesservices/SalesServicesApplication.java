package com.cibertec.salesservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SalesServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalesServicesApplication.class, args);
	}
}
