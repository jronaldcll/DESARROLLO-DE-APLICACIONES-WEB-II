package com.cibertec.salesservices.rest;

import com.cibertec.salesservices.dto.SaleRequest;
import com.cibertec.salesservices.dto.SaleResponse;
import com.cibertec.salesservices.dto.SaleWithProductResponse;
import com.cibertec.salesservices.negocio.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// @RestController expone endpoints HTTP JSON del servicio.
// En AWS esto equivale a un API Gateway que invoca una Lambda o un contenedor.
@RestController
public class SaleController {

	private final SaleService saleService;

	public SaleController(SaleService saleService) {
		this.saleService = saleService;
	}

	@GetMapping("/sales")
	public ResponseEntity<List<SaleResponse>> getAllSales() {
		return ResponseEntity.ok(saleService.getAllSales());
	}

	@GetMapping("/sales/{id}")
	public ResponseEntity<SaleResponse> getSaleById(@PathVariable Long id) {
		return ResponseEntity.ok(saleService.getSaleById(id));
	}

	// Este endpoint representa el caso de uso sincrono entre microservicios via Feign.
	// En AWS se parece a una llamada HTTP directa entre dos microservicios o dos Lambdas con API Gateway.
	@GetMapping("/sales/{id}/details")
	public ResponseEntity<SaleWithProductResponse> getSaleDetailsWithFeign(@PathVariable Long id) {
		return ResponseEntity.ok(saleService.getSaleDetailsWithFeign(id));
	}

	// @PostMapping asocia el método al POST /sales.
	// En AWS sería un route POST de API Gateway hacia una Lambda.
	@PostMapping("/sales")
	public ResponseEntity<SaleResponse> createSale(@RequestBody SaleRequest request) {
		return ResponseEntity.ok(saleService.createSale(request));
	}

	// Este endpoint separa el caso RabbitMQ del caso Kafka para que ambos flujos convivan sin duplicar
	// el descuento de stock sobre la misma venta.
	@PostMapping("/sales/rabbit-reserve")
	public ResponseEntity<SaleResponse> createSaleWithRabbitReserve(@RequestBody SaleRequest request) {
		return ResponseEntity.ok(saleService.createSaleWithRabbitReserve(request));
	}

	@PutMapping("/sales/{id}")
	public ResponseEntity<SaleResponse> updateSale(@PathVariable Long id, @RequestBody SaleRequest request) {
		return ResponseEntity.ok(saleService.updateSale(id, request));
	}

	@DeleteMapping("/sales/{id}")
	public ResponseEntity<?> deleteSale(@PathVariable Long id) {
		saleService.deleteSale(id);
		return ResponseEntity.noContent().build();
	}
}
