package com.cibertec.resiliencia.inventario.dto;

public record DemoStateResponse(
		Boolean fallaActiva,
		Long demoraMillis
) {
}
