package com.cibertec.salesservices.negocio;

import com.cibertec.salesservices.client.ProductClient;
import com.cibertec.salesservices.dto.ProductResponse;
import com.cibertec.salesservices.dto.SaleRequest;
import com.cibertec.salesservices.dto.SaleResponse;
import com.cibertec.salesservices.entidades.Sale;
import com.cibertec.salesservices.repositorio.SaleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SaleService {

	private final SaleRepository saleRepository;
	private final ProductClient productClient;

	public SaleService(SaleRepository saleRepository, ProductClient productClient) {
		this.saleRepository = saleRepository;
		this.productClient = productClient;
	}

	public SaleResponse getSaleById(Long saleId) {
		Sale sale = saleRepository.findById(saleId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));

		return buildSaleResponse(sale);
	}

	public List<SaleResponse> getAllSales() {
		return saleRepository.findAll().stream()
				.map(this::buildSaleResponse)
				.toList();
	}

	public SaleResponse createSale(SaleRequest request) {
		Sale sale = Sale.builder()
				.productId(request.productId())
				.quantity(request.quantity())
				.build();
		return buildSaleResponse(saleRepository.save(sale));
	}

	public SaleResponse updateSale(Long saleId, SaleRequest request) {
		if (!saleRepository.existsById(saleId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada");
		}

		Sale sale = new Sale(
				saleId,
				request.productId(),
				request.quantity()
		);
		return buildSaleResponse(saleRepository.save(sale));
	}

	public void deleteSale(Long saleId) {
		if (!saleRepository.existsById(saleId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada");
		}
		saleRepository.deleteById(saleId);
	}

	private SaleResponse buildSaleResponse(Sale sale) {
		ProductResponse product = productClient.getProductById(sale.productId());
		BigDecimal total = product.price().multiply(BigDecimal.valueOf(sale.quantity()));

		return new SaleResponse(
				sale.saleId(),
				sale.quantity(),
				total,
				product
		);
	}
}
