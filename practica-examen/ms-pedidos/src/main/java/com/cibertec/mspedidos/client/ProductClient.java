package com.cibertec.mspedidos.client;

import com.cibertec.mspedidos.dto.ProductResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
		name = "ms-notificaciones",
		url = "http://localhost:8081"
)
public interface ProductClient {

	@GetMapping("/products/{id}")
	ProductResponse getProductById(@PathVariable Long id);
}
