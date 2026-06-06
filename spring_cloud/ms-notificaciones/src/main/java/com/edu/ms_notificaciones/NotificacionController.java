package com.edu.ms_notificaciones;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionController {

    @Value("${server.port}")
    private String puerto;

    @GetMapping("/enviar/{tipo}")
    public Map<String, Object> enviarNotificacion(@PathVariable String tipo){
        return Map.of(
                "tipo", tipo,
                "canal", "SMS",
                "estado","enviado",
                "instancia", puerto
        );
    }
}
