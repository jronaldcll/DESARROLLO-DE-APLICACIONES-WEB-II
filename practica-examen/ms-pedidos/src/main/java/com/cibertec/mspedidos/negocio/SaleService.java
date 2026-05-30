package com.cibertec.mspedidos.negocio;

import com.cibertec.mspedidos.dto.SaleRequest;
import com.cibertec.mspedidos.dto.SaleResponse;
import com.cibertec.mspedidos.dto.MensajeNotificacionResponse;
import com.cibertec.mspedidos.dto.SaleWithNotificationResponse;
import com.cibertec.mspedidos.dto.SaleWithProductResponse;
import com.cibertec.mspedidos.dto.ProductResponse;
import com.cibertec.mspedidos.client.NotificationClient;
import com.cibertec.mspedidos.client.ProductClient;
import com.cibertec.mspedidos.entidades.Sale;
import com.cibertec.mspedidos.rabbitmq.PurchaseEmailEvent;
import com.cibertec.mspedidos.rabbitmq.PurchaseEmailProducer;
import com.cibertec.mspedidos.repositorio.SaleRepository;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
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
	private final ProductClient productClient;
	private final NotificationClient notificationClient;
	private final ObjectProvider<PurchaseEmailProducer> purchaseEmailProducer;
	private final Long mensajeConfirmacionId;

	public SaleService(
			SaleRepository saleRepository,
			ProductClient productClient,
			NotificationClient notificationClient,
			ObjectProvider<PurchaseEmailProducer> purchaseEmailProducer,
			@Value("${notificaciones.mensaje-confirmacion-id:1}") Long mensajeConfirmacionId
	) {
		this.saleRepository = saleRepository;
		this.productClient = productClient;
		this.notificationClient = notificationClient;
		this.purchaseEmailProducer = purchaseEmailProducer;
		this.mensajeConfirmacionId = mensajeConfirmacionId;
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

	public SaleWithNotificationResponse createSale(SaleRequest request) {
		Sale storedSale = savePendingSale(request);
		MensajeNotificacionResponse mensaje = notificationClient.getMensajeById(mensajeConfirmacionId);
		publishPurchaseEmail(storedSale, request.correo(), mensaje);
		return buildSaleWithNotificationResponse(storedSale, mensaje);
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

	private SaleWithNotificationResponse buildSaleWithNotificationResponse(
			Sale sale,
			MensajeNotificacionResponse mensaje
	) {
		return new SaleWithNotificationResponse(
				sale.getSaleId(),
				sale.getProductId(),
				sale.getQuantity(),
				sale.getCustomerId(),
				sale.getStatus(),
				mensaje
		);
	}

	Sale savePendingSale(SaleRequest request) {
		Sale sale = Sale.builder()
				.productId(request.productId())
				.quantity(request.quantity())
				.customerId(request.customerId())
				.status("PENDING")
				.build();
		return saleRepository.save(sale);
	}

	private void publishPurchaseEmail(Sale sale, String correo, MensajeNotificacionResponse mensajeNotificacion) {
		PurchaseEmailProducer producer = purchaseEmailProducer.getIfAvailable();
		if (producer == null) {
			throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "RabbitMQ no está habilitado");
		}

		producer.publish(new PurchaseEmailEvent(
				sale.getSaleId(),
				sale.getCustomerId(),
				correo,
				mensajeNotificacion.id(),
				mensajeNotificacion.nombre(),
				"Gracias por su compra. Su pedido fue registrado correctamente.",
				Instant.now()
		));
	}
}
