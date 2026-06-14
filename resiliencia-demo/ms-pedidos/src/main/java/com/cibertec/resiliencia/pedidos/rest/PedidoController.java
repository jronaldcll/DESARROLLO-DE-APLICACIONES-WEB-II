package com.cibertec.resiliencia.pedidos.rest;

import com.cibertec.resiliencia.pedidos.dto.PedidoRequest;
import com.cibertec.resiliencia.pedidos.dto.PedidoResponse;
import com.cibertec.resiliencia.pedidos.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PedidoController {

	private final PedidoService pedidoService;

	public PedidoController(PedidoService pedidoService) {
		this.pedidoService = pedidoService;
	}

	@PostMapping("/pedidos/sin-resiliencia")
	public ResponseEntity<PedidoResponse> crearPedidoSinResiliencia(@RequestBody PedidoRequest request) {
		return ResponseEntity.ok(pedidoService.crearPedidoSinResiliencia(request));
	}

	@PostMapping("/pedidos/con-resiliencia")
	public ResponseEntity<PedidoResponse> crearPedidoConResiliencia(@RequestBody PedidoRequest request) {
		return ResponseEntity.ok(pedidoService.crearPedidoConResiliencia(request));
	}
}
