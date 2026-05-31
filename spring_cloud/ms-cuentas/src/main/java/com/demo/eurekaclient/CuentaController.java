package com.demo.eurekaclient;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class CuentaController {

    private static final Map<String, Double> SALDOS = Map.of(
            "001", 350.0,
            "002", 120.5,
            "003", 0.0
    );

    @Value("${server.port}")
    private String puerto;

    @GetMapping("/cuentas/saldo/{id}")
    public Map<String, Object> consultarSaldo(@PathVariable String id) {
        double saldo = SALDOS.getOrDefault(id, 0.0);

        return Map.of(
                "cuenta", id,
                "saldo", saldo,
                "disponible", saldo > 0,
                "instancia", puerto
        );
    }
}
