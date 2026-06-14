# Demo: Resiliencia entre ms-pedidos y ms-inventario

Este ejemplo es independiente del resto del proyecto. No usa Eureka, RabbitMQ ni Kafka.

- `ms-pedidos`: puerto `8090`, recibe pedidos y consulta stock.
- `ms-inventario`: puerto `8091`, responde stock y permite simular fallas o demora.
- Relacion: `ms-pedidos` llama por HTTP/Feign a `ms-inventario`.

## Ejecutar

Terminal 1:

```bash
cd resiliencia-demo/ms-inventario
mvn spring-boot:run
```

Terminal 2:

```bash
cd resiliencia-demo/ms-pedidos
mvn spring-boot:run
```

Postman:

```text
resiliencia-demo/postman/resiliencia-ms-pedidos-inventario.postman_collection.json
```

## Version 1 - Sin resiliencia

Endpoint:

```http
POST http://localhost:8090/pedidos/sin-resiliencia
Content-Type: application/json

{
  "productoId": 1,
  "cantidad": 2,
  "clienteId": 9001
}
```

Cliente Feign:

<pre style="background-color:#0d1117;color:#e6edf3;padding:16px;border-radius:8px;overflow:auto"><code class="language-java">@FeignClient(
        name = "ms-inventario",              // Nombre logico solo para identificar el cliente.
        url = "${inventario.base-url}"       // URL directa: no depende de Eureka.
)
public interface InventarioClient {

    @GetMapping("/inventario/{productoId}")  // Endpoint remoto expuesto por ms-inventario.
    StockResponse consultarStock(@PathVariable Long productoId);
}</code></pre>

Servicio sin proteccion:

<pre style="background-color:#0d1117;color:#e6edf3;padding:16px;border-radius:8px;overflow:auto"><code class="language-java">public PedidoResponse crearPedidoSinResiliencia(PedidoRequest request) {
    StockResponse stock = inventarioClient.consultarStock(request.productoId()); // Si inventario falla, Feign lanza excepcion.
    validarStockDisponible(request, stock);                                      // Esta linea no se ejecuta si hubo timeout o 503.
    return pedidoConfirmado(request, stock);                                     // El usuario solo recibe respuesta si todo salio bien.
}</code></pre>

Cuando `ms-inventario` falla o tarda mas que el timeout de Feign:

- `ms-pedidos` no tiene fallback.
- La excepcion de Feign se propaga.
- El usuario recibe error HTTP `500`.
- El thread espera hasta timeout.
- Si muchas solicitudes hacen lo mismo, puede aparecer fallo en cascada.

Simular falla:

```http
POST http://localhost:8091/inventario/demo/falla/true
```

Simular demora:

```http
POST http://localhost:8091/inventario/demo/demora/2000
```

## Version 2 - Con resiliencia

Dependencia en `pom.xml`:

<pre style="background-color:#0d1117;color:#e6edf3;padding:16px;border-radius:8px;overflow:auto"><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;io.github.resilience4j&lt;/groupId&gt;       &lt;!-- Libreria de resiliencia. --&gt;
    &lt;artifactId&gt;resilience4j-spring-boot3&lt;/artifactId&gt; &lt;!-- Integracion con Spring Boot 3. --&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;        &lt;!-- Necesario para interceptar @CircuitBreaker. --&gt;
    &lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;        &lt;!-- Expone /actuator/circuitbreakers. --&gt;
    &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
&lt;/dependency&gt;</code></pre>

Configuracion en `application.yml`:

<pre style="background-color:#0d1117;color:#e6edf3;padding:16px;border-radius:8px;overflow:auto"><code class="language-yaml">spring:
  cloud:
    openfeign:
      client:
        config:
          default:
            connectTimeout: 1000              # Maximo 1s intentando conectar con inventario.
            readTimeout: 1000                 # Maximo 1s esperando respuesta del endpoint remoto.

management:
  endpoints:
    web:
      exposure:
        include: health,info,circuitbreakers,circuitbreakerevents # Habilita endpoints de observabilidad.

resilience4j:
  circuitbreaker:
    instances:
      inventario:
        registerHealthIndicator: true         # Publica el estado del CB en Actuator.
        slidingWindowSize: 5                  # Ventana pequena para que abra rapido en demo.
        minimumNumberOfCalls: 5               # Evalua el estado despues de 5 llamadas.
        failureRateThreshold: 50              # Abre si falla al menos el 50%.
        waitDurationInOpenState: 10s          # Tiempo antes de probar HALF_OPEN.
        permittedNumberOfCallsInHalfOpenState: 2
        automaticTransitionFromOpenToHalfOpenEnabled: true</code></pre>

Servicio con Circuit Breaker + Fallback:

<pre style="background-color:#0d1117;color:#e6edf3;padding:16px;border-radius:8px;overflow:auto"><code class="language-java">@CircuitBreaker(name = "inventario", fallbackMethod = "fallbackCrearPedido") // Protege este flujo con el CB llamado inventario.
public PedidoResponse crearPedidoConResiliencia(PedidoRequest request) {
    StockResponse stock = inventarioClient.consultarStock(request.productoId()); // Llamada remota que puede fallar o tardar.
    validarStockDisponible(request, stock);                                      // Regla de negocio si inventario respondio.
    return pedidoConfirmado(request, stock);                                     // Respuesta normal cuando el flujo esta sano.
}

public PedidoResponse fallbackCrearPedido(PedidoRequest request, Throwable error) { // Misma firma del metodo + Throwable al final.
    return new PedidoResponse(
            secuenciaPedidos.incrementAndGet(),                                  // Genera id local para trazabilidad.
            request.productoId(),                                                // Conserva el producto solicitado.
            request.cantidad(),                                                  // Conserva la cantidad solicitada.
            request.clienteId(),                                                 // Conserva el cliente solicitante.
            "RECIBIDO_SIN_VALIDAR_STOCK",                                        // Estado degradado, no confirmacion final.
            "Pedido recibido en modo degradado. Inventario no respondio: "
                    + error.getClass().getSimpleName(),                          // Mensaje claro para soporte/demo.
            null                                                                 // No hay detalle de inventario porque fallo el destino.
    );
}</code></pre>

Respuesta degradada esperada:

```json
{
  "pedidoId": 1001,
  "productoId": 1,
  "cantidad": 2,
  "clienteId": 9001,
  "estado": "RECIBIDO_SIN_VALIDAR_STOCK",
  "mensaje": "Pedido recibido en modo degradado. Inventario no respondio: ServiceUnavailable",
  "inventario": null
}
```

Ver estado del Circuit Breaker:

```http
GET http://localhost:8090/actuator/circuitbreakers
```

Ver eventos del Circuit Breaker:

```http
GET http://localhost:8090/actuator/circuitbreakerevents
```

## Tabla comparativa

| Version | Que pasa cuando falla `ms-inventario` | Experiencia de usuario | Riesgo operativo |
|---|---|---|---|
| Sin resiliencia | La excepcion de Feign sube hasta el controlador y termina como error `500`. | El usuario ve un error tecnico y no sabe si su pedido fue recibido. | Fallo en cascada, threads esperando timeout y degradacion del servicio llamador. |
| Con resiliencia | Resilience4j ejecuta fallback y, tras varias fallas, abre el Circuit Breaker. | El usuario recibe una respuesta controlada: pedido recibido en modo degradado. | Se corta la presion sobre inventario y `ms-pedidos` sigue respondiendo. |

En una fintech real, este mismo patron evita que una caida temporal del servicio de pagos, fraude o saldos tumbe todo el flujo de compra: se responde de forma controlada y se protege la plataforma mientras el servicio critico se recupera.
