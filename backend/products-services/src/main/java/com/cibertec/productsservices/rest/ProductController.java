package com.cibertec.productsservices.rest;

import com.cibertec.productsservices.dto.ProductResponse;
import com.cibertec.productsservices.entidades.Product;
import com.cibertec.productsservices.negocio.ProductService;
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
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping("/products")
	public List<ProductResponse> getAllProducts() {
		return productService.getAllProducts();
	}

	@GetMapping("/products/{id}")
	public ProductResponse getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}

	@PostMapping("/products")
	public ProductResponse createProduct(@RequestBody Product product) {
		return productService.createProduct(product);
	}

	@PutMapping("/products/{id}")
	public ProductResponse updateProduct(@PathVariable Long id, @RequestBody Product product) {
		return productService.updateProduct(id, product);
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}
}
