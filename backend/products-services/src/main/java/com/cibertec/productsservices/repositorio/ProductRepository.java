package com.cibertec.productsservices.repositorio;

import com.cibertec.productsservices.entidades.Product;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProductRepository {

	private final Map<Long, Product> products = new LinkedHashMap<>();
	private final AtomicLong sequence = new AtomicLong(2);

	public ProductRepository() {
		products.put(1L, Product.builder()
				.id(1L)
				.name("Laptop Lenovo")
				.price(new BigDecimal("3500.00"))
				.stock(10)
				.build());
		products.put(2L, Product.builder()
				.id(2L)
				.name("Mouse Logitech")
				.price(new BigDecimal("120.00"))
				.stock(25)
				.build());
	}

	public List<Product> findAll() {
		return products.values().stream()
				.sorted(Comparator.comparing(Product::id))
				.toList();
	}

	public Optional<Product> findById(Long id) {
		return Optional.ofNullable(products.get(id));
	}

	public Product save(Product product) {
		Long id = product.id();
		if (id == null) {
			id = sequence.incrementAndGet();
		} else {
			Long finalId = id;
			sequence.updateAndGet(current -> Math.max(current, finalId));
		}

		Product storedProduct = new Product(
				id,
				product.name(),
				product.price(),
				product.stock()
		);
		products.put(id, storedProduct);
		return storedProduct;
	}

	public boolean existsById(Long id) {
		return products.containsKey(id);
	}

	public void deleteById(Long id) {
		products.remove(id);
	}
}
