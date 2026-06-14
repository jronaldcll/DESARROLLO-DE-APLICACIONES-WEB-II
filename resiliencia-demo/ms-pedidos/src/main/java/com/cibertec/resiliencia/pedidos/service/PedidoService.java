package com.cibertec.resiliencia.pedidos.service;

import com.cibertec.resiliencia.pedidos.client.InventarioClient;
import com.cibertec.resiliencia.pedidos.dto.PedidoRequest;
import com.cibertec.resiliencia.pedidos.dto.PedidoResponse;
import com.cibertec.resiliencia.pedidos.dto.StockResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class PedidoService {

	private final InventarioClient inventarioClient;
	private final AtomicLong secuenciaPedidos = new AtomicLong(1000);

	public PedidoService(InventarioClient inventarioClient) {
		this.inventarioClient = inventarioClient;
	}

	public PedidoResponse crearPedidoSinResiliencia(PedidoRequest request) {
		StockResponse stock = inventarioClient.consultarStock(request.productoId());
		validarStockDisponible(request, stock);
		return pedidoConfirmado(request, stock);
	}

	@CircuitBreaker(name = "inventario", fallbackMethod = "fallbackCrearPedido")
	public PedidoResponse crearPedidoConResiliencia(PedidoRequest request) {
		StockResponse stock = inventarioClient.consultarStock(request.productoId());
		validarStockDisponible(request, stock);
		return pedidoConfirmado(request, stock);
	}

	public PedidoResponse fallbackCrearPedido(PedidoRequest request, Throwable error) {
		return new PedidoResponse(
				secuenciaPedidos.incrementAndGet(),
				request.productoId(),
				request.cantidad(),
				request.clienteId(),
				"RECIBIDO_SIN_VALIDAR_STOCK",
				"Pedido recibido en modo degradado. Inventario no respondio: " + error.getClass().getSimpleName(),
				null
		);
	}

	private void validarStockDisponible(PedidoRequest request, StockResponse stock) {
		if (!stock.disponible() || stock.stock() < request.cantidad()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Stock insuficiente para confirmar el pedido");
		}
	}

	private PedidoResponse pedidoConfirmado(PedidoRequest request, StockResponse stock) {
		return new PedidoResponse(
				secuenciaPedidos.incrementAndGet(),
				request.productoId(),
				request.cantidad(),
				request.clienteId(),
				"CONFIRMADO",
				"Pedido confirmado con stock validado por ms-inventario",
				stock
		);
	}
}
