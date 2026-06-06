package com.cibertec.jwtsalesservices.rest;

import com.cibertec.jwtsalesservices.dto.SaleResponse;
import com.cibertec.jwtsalesservices.negocio.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
