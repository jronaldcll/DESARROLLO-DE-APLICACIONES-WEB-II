package com.cibertec.salesservices.rest;

import com.cibertec.salesservices.dto.ErrorResponse;
import com.cibertec.salesservices.dto.SaleRequest;
import com.cibertec.salesservices.dto.SaleResponse;
import com.cibertec.salesservices.negocio.SaleService;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SaleController {

	private final SaleService saleService;

	public SaleController(SaleService saleService) {
		this.saleService = saleService;
	}

	@GetMapping("/sales")
	public ResponseEntity<?> getAllSales() {
		try {
			List<SaleResponse> response = saleService.getAllSales();
			return ResponseEntity.ok(response);
		} catch (FeignException ex) {
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
					.body(new ErrorResponse("products-service no disponible"));
		}
	}

	@GetMapping("/sales/{id}")
	public ResponseEntity<?> getSaleById(@PathVariable Long id) {
		try {
			SaleResponse response = saleService.getSaleById(id);
			return ResponseEntity.ok(response);
		} catch (FeignException ex) {
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
					.body(new ErrorResponse("products-service no disponible"));
		}
	}

	@PostMapping("/sales")
	public ResponseEntity<?> createSale(@RequestBody SaleRequest request) {
		try {
			SaleResponse response = saleService.createSale(request);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (FeignException ex) {
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
					.body(new ErrorResponse("products-service no disponible"));
		}
	}

	@PutMapping("/sales/{id}")
	public ResponseEntity<?> updateSale(@PathVariable Long id, @RequestBody SaleRequest request) {
		try {
			SaleResponse response = saleService.updateSale(id, request);
			return ResponseEntity.ok(response);
		} catch (FeignException ex) {
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
					.body(new ErrorResponse("products-service no disponible"));
		}
	}

	@DeleteMapping("/sales/{id}")
	public ResponseEntity<?> deleteSale(@PathVariable Long id) {
		saleService.deleteSale(id);
		return ResponseEntity.noContent().build();
	}
}
