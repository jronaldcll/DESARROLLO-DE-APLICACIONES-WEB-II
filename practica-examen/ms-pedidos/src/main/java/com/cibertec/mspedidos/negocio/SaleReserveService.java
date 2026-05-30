package com.cibertec.mspedidos.negocio;

import com.cibertec.mspedidos.dto.SaleRequest;
import com.cibertec.mspedidos.dto.SaleResponse;
import com.cibertec.mspedidos.entidades.Sale;
import com.cibertec.mspedidos.rabbitmq.StockReserveEvent;
import com.cibertec.mspedidos.rabbitmq.StockReserveProducer;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "messaging.rabbitmq.stock.enabled", havingValue = "true")
public class SaleReserveService {

	private final SaleService saleService;
	private final StockReserveProducer stockReserveProducer;

	public SaleReserveService(SaleService saleService, StockReserveProducer stockReserveProducer) {
		this.saleService = saleService;
		this.stockReserveProducer = stockReserveProducer;
	}

	public SaleResponse createSaleWithRabbitReserve(SaleRequest request) {
		Sale storedSale = saleService.savePendingSale(request);

		stockReserveProducer.publish(new StockReserveEvent(
				storedSale.getSaleId(),
				storedSale.getProductId(),
				storedSale.getQuantity(),
				storedSale.getCustomerId()
		));

		return new SaleResponse(
				storedSale.getSaleId(),
				storedSale.getProductId(),
				storedSale.getQuantity(),
				storedSale.getCustomerId(),
				storedSale.getStatus()
		);
	}
}
