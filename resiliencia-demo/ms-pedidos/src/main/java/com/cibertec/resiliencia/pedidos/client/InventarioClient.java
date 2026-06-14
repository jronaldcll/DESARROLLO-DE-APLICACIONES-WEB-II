package com.cibertec.resiliencia.pedidos.client;

import com.cibertec.resiliencia.pedidos.dto.StockResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
		name = "ms-inventario",
		url = "${inventario.base-url}"
)
public interface InventarioClient {

	@GetMapping("/inventario/{productoId}")
	StockResponse consultarStock(@PathVariable Long productoId);
}
