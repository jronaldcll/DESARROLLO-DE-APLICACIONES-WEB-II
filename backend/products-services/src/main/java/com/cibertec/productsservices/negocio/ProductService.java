package com.cibertec.productsservices.negocio;

import com.cibertec.productsservices.dto.ProductResponse;
import com.cibertec.productsservices.entidades.Product;
import com.cibertec.productsservices.repositorio.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// @Service registra lógica de negocio del catálogo y stock.
// En AWS este código viviría dentro de una Lambda o un servicio contenedorizado consumidor.
@Service
public class ProductService {

	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public ProductResponse getProductById(Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

		return mapToResponse(product);
	}

	public List<ProductResponse> getAllProducts() {
		return productRepository.findAll().stream()
				.map(this::mapToResponse)
				.toList();
	}

	public ProductResponse createProduct(Product product) {
		return mapToResponse(productRepository.save(product));
	}

	public ProductResponse updateProduct(Long id, Product product) {
		if (!productRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
		}

		Product updatedProduct = new Product(
				id,
				product.getName(),
				product.getPrice(),
				product.getStock()
		);
		return mapToResponse(productRepository.save(updatedProduct));
	}

	public void deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
		}
		productRepository.deleteById(id);
	}

	public synchronized int decreaseStock(Long productId, Integer quantity) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

		if (product.getStock() < quantity) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Stock insuficiente para procesar el movimiento");
		}

		Product updatedProduct = new Product(
				product.getId(),
				product.getName(),
				product.getPrice(),
				product.getStock() - quantity
		);
		productRepository.save(updatedProduct);
		return updatedProduct.getStock();
	}

	private ProductResponse mapToResponse(Product product) {
		return new ProductResponse(
				product.getId(),
				product.getName(),
				product.getPrice(),
				product.getStock()
		);
	}
}
