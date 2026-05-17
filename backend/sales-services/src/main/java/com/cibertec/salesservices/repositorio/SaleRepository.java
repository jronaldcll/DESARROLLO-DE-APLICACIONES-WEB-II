package com.cibertec.salesservices.repositorio;

import com.cibertec.salesservices.entidades.Sale;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class SaleRepository {

	private final Map<Long, Sale> sales = new LinkedHashMap<>();
	private final AtomicLong sequence = new AtomicLong(101);

	public SaleRepository() {
		sales.put(100L, Sale.builder()
				.saleId(100L)
				.productId(1L)
				.quantity(2)
				.build());
		sales.put(101L, Sale.builder()
				.saleId(101L)
				.productId(2L)
				.quantity(3)
				.build());
	}

	public List<Sale> findAll() {
		return sales.values().stream()
				.sorted(Comparator.comparing(Sale::saleId))
				.toList();
	}

	public Optional<Sale> findById(Long saleId) {
		return Optional.ofNullable(sales.get(saleId));
	}

	public Sale save(Sale sale) {
		Long saleId = sale.saleId();
		if (saleId == null) {
			saleId = sequence.incrementAndGet();
		} else {
			Long finalSaleId = saleId;
			sequence.updateAndGet(current -> Math.max(current, finalSaleId));
		}

		Sale storedSale = new Sale(
				saleId,
				sale.productId(),
				sale.quantity()
		);
		sales.put(saleId, storedSale);
		return storedSale;
	}

	public boolean existsById(Long saleId) {
		return sales.containsKey(saleId);
	}

	public void deleteById(Long saleId) {
		sales.remove(saleId);
	}
}
