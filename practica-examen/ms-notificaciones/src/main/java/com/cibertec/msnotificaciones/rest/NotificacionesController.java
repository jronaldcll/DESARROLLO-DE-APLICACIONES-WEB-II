package com.cibertec.msnotificaciones.rest;

import com.cibertec.msnotificaciones.dto.ProductResponse;
import com.cibertec.msnotificaciones.entidades.Product;
import com.cibertec.msnotificaciones.negocio.ProductService;
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

	public NotificacionesController(ProductService productService) {
		this.productService = productService;
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
