package com.cibertec.resiliencia.inventario.rest;

import com.cibertec.resiliencia.inventario.dto.DemoStateResponse;
import com.cibertec.resiliencia.inventario.dto.StockResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class InventarioController {

	private final AtomicBoolean fallaActiva = new AtomicBoolean(false);
	private final AtomicLong demoraMillis = new AtomicLong(0);
	private final Map<Long, StockResponse> inventario = new ConcurrentHashMap<>();

	public InventarioController() {
		inventario.put(1L, new StockResponse(1L, "Laptop Lenovo", 10, true, "ms-inventario"));
		inventario.put(2L, new StockResponse(2L, "Teclado mecanico", 0, false, "ms-inventario"));
		inventario.put(3L, new StockResponse(3L, "Mouse gamer", 25, true, "ms-inventario"));
	}

	@GetMapping("/inventario/{productoId}")
	public StockResponse consultarStock(@PathVariable Long productoId) throws InterruptedException {
		if (fallaActiva.get()) {
			throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Inventario no disponible para la demo");
		}

		Thread.sleep(demoraMillis.get());

		StockResponse stock = inventario.get(productoId);
		if (stock == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
		}

		return stock;
	}

	@PostMapping("/inventario/demo/falla/{activo}")
	public DemoStateResponse cambiarFalla(@PathVariable Boolean activo) {
		fallaActiva.set(activo);
		return estadoDemo();
	}

	@PostMapping("/inventario/demo/demora/{millis}")
	public DemoStateResponse cambiarDemora(@PathVariable Long millis) {
		demoraMillis.set(Math.max(0, millis));
		return estadoDemo();
	}

	@GetMapping("/inventario/demo/estado")
	public DemoStateResponse estadoDemo() {
		return new DemoStateResponse(fallaActiva.get(), demoraMillis.get());
	}
}
