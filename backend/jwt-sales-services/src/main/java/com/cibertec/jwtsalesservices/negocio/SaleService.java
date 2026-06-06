package com.cibertec.jwtsalesservices.negocio;

import com.cibertec.jwtsalesservices.dto.SaleResponse;
import com.cibertec.jwtsalesservices.entidades.Sale;
import com.cibertec.jwtsalesservices.repositorio.SaleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {

	private final SaleRepository saleRepository;

	public SaleService(SaleRepository saleRepository) {
		this.saleRepository = saleRepository;
	}

	public List<SaleResponse> getAllSales() {
		return saleRepository.findAll().stream()
				.map(this::mapToResponse)
				.toList();
	}

	private SaleResponse mapToResponse(Sale sale) {
		return new SaleResponse(
				sale.getSaleId(),
				sale.getProductId(),
				sale.getQuantity(),
				sale.getCustomerId(),
				sale.getStatus()
		);
	}
}
