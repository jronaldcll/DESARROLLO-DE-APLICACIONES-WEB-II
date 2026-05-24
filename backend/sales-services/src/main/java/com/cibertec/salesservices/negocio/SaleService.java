package com.cibertec.salesservices.negocio;

import com.cibertec.salesservices.dto.SaleRequest;
import com.cibertec.salesservices.dto.SaleResponse;
import com.cibertec.salesservices.dto.SaleWithProductResponse;
import com.cibertec.salesservices.dto.ProductResponse;
import com.cibertec.salesservices.client.ProductClient;
import com.cibertec.salesservices.entidades.Sale;
import com.cibertec.salesservices.kafka.StockMovementProducer;
import com.cibertec.salesservices.kafka.StockMovementEvent;
import com.cibertec.salesservices.rabbitmq.StockReserveEvent;
import com.cibertec.salesservices.rabbitmq.StockReserveProducer;
import com.cibertec.salesservices.repositorio.SaleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

// @Service registra lógica de negocio administrada por Spring.
// En AWS este rol normalmente vive dentro del código de una Lambda o de un microservicio ECS.
@Service
public class SaleService {

	private final SaleRepository saleRepository;
	private final StockMovementProducer stockMovementProducer;
	private final StockReserveProducer stockReserveProducer;
	private final ProductClient productClient;

	public SaleService(
			SaleRepository saleRepository,
			StockMovementProducer stockMovementProducer,
			StockReserveProducer stockReserveProducer,
			ProductClient productClient
	) {
		this.saleRepository = saleRepository;
		this.stockMovementProducer = stockMovementProducer;
		this.stockReserveProducer = stockReserveProducer;
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

	public SaleWithProductResponse getSaleDetailsWithFeign(Long saleId) {
		Sale sale = saleRepository.findById(saleId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));
		ProductResponse product = productClient.getProductById(sale.getProductId());
		BigDecimal total = product.price().multiply(BigDecimal.valueOf(sale.getQuantity()));

		return new SaleWithProductResponse(
				sale.getSaleId(),
				sale.getProductId(),
				sale.getQuantity(),
				sale.getCustomerId(),
				sale.getStatus(),
				total,
				product
		);
	}

	public SaleResponse createSale(SaleRequest request) {
		Sale storedSale = savePendingSale(request);

		stockMovementProducer.publish(new StockMovementEvent(
				storedSale.getSaleId(),
				storedSale.getProductId(),
				storedSale.getQuantity(),
				storedSale.getCustomerId(),
				Instant.now()
		));

		return buildSaleResponse(storedSale);
	}

	public SaleResponse createSaleWithRabbitReserve(SaleRequest request) {
		Sale storedSale = savePendingSale(request);

		stockReserveProducer.publish(new StockReserveEvent(
				storedSale.getSaleId(),
				storedSale.getProductId(),
				storedSale.getQuantity(),
				storedSale.getCustomerId()
		));

		return buildSaleResponse(storedSale);
	}

	public SaleResponse updateSale(Long saleId, SaleRequest request) {
		Sale currentSale = saleRepository.findById(saleId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));

		Sale sale = new Sale(
					saleId,
					request.productId(),
					request.quantity(),
					request.customerId(),
					currentSale.getStatus()
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
		return new SaleResponse(
				sale.getSaleId(),
				sale.getProductId(),
				sale.getQuantity(),
				sale.getCustomerId(),
				sale.getStatus()
		);
	}

	private Sale savePendingSale(SaleRequest request) {
		Sale sale = Sale.builder()
				.productId(request.productId())
				.quantity(request.quantity())
				.customerId(request.customerId())
				.status("PENDING")
				.build();
		return saleRepository.save(sale);
	}
}
