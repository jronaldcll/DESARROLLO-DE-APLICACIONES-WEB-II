package com.curso.front;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class RecargaController {

    private final RestTemplate restTemplate;

    public RecargaController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/recargas/procesar/{cuentaId}/{monto}")
    @SuppressWarnings("unchecked")
    public Map<String, Object> procesarRecarga(@PathVariable String cuentaId, @PathVariable double monto) {
        Map<String, Object> respuestaCuenta = restTemplate.getForObject(
                "http://ms-cuentas/cuentas/saldo/{cuentaId}",
                Map.class,
                cuentaId
        );

        double saldo = ((Number) respuestaCuenta.get("saldo")).doubleValue();
        boolean aprobada = saldo >= monto;

        return Map.of(
                "cuenta", cuentaId,
                "monto_solicitado", monto,
                "saldo_disponible", saldo,
                "recarga_aprobada", aprobada,
                "motivo", aprobada ? "Saldo suficiente" : "Saldo insuficiente",
                "atendido_por", respuestaCuenta.get("instancia")
        );
    }
}
