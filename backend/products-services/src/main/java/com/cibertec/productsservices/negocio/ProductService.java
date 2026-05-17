package com.cibertec.productsservices.negocio;

import com.cibertec.productsservices.dto.ProductResponse;
import com.cibertec.productsservices.entidades.Product;
import com.cibertec.productsservices.repositorio.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
				product.name(),
				product.price(),
				product.stock()
		);
		return mapToResponse(productRepository.save(updatedProduct));
	}

	public void deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
		}
		productRepository.deleteById(id);
	}

	private ProductResponse mapToResponse(Product product) {
		return new ProductResponse(
				product.id(),
				product.name(),
				product.price(),
				product.stock()
		);
	}
}
