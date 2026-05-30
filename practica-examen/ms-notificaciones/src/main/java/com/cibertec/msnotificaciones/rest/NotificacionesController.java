package com.cibertec.msnotificaciones.rest;

import com.cibertec.msnotificaciones.dto.ProductResponse;
import com.cibertec.msnotificaciones.dto.MensajeNotificacionResponse;
import com.cibertec.msnotificaciones.dto.SaleCancellationLogResponse;
import com.cibertec.msnotificaciones.entidades.MensajeNotificacion;
import com.cibertec.msnotificaciones.entidades.Product;
import com.cibertec.msnotificaciones.negocio.MensajeNotificacionService;
import com.cibertec.msnotificaciones.negocio.ProductService;
import com.cibertec.msnotificaciones.negocio.SaleCancellationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionesController {

	private final ProductService productService;
	private final MensajeNotificacionService mensajeNotificacionService;
	private final SaleCancellationService saleCancellationService;

	public NotificacionesController(ProductService productService,
									MensajeNotificacionService mensajeNotificacionService,
									SaleCancellationService saleCancellationService) {
		this.productService = productService;
		this.mensajeNotificacionService = mensajeNotificacionService;
		this.saleCancellationService = saleCancellationService;
	}

	@GetMapping
	public List<ProductResponse> getAll() {
		return productService.getAllProducts();
	}

	@GetMapping("/{id}")
	public ProductResponse getById(@PathVariable Long id) {
		return productService.getProductById(id);
	}

	@PostMapping
	public ProductResponse create(@RequestBody Product product) {
		return productService.createProduct(product);
	}

	@PostMapping("/mensajes")
	public MensajeNotificacionResponse registrarMensaje(@RequestBody MensajeNotificacion mensajeNotificacion) {
		return mensajeNotificacionService.registrarMensaje(mensajeNotificacion);
	}

	@GetMapping("/mensajes/{id}")
	public MensajeNotificacionResponse getMensajeActivoById(@PathVariable Long id) {
		return mensajeNotificacionService.getMensajeActivoById(id);
	}

	@GetMapping("/ventas/{saleId}/anulaciones/logs")
	public List<SaleCancellationLogResponse> getSaleCancellationLogs(@PathVariable Long saleId) {
		return saleCancellationService.getLogsBySaleId(saleId);
	}

	@PutMapping("/{id}")
	public ProductResponse update(@PathVariable Long id, @RequestBody Product product) {
		return productService.updateProduct(id, product);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}
}
