# Sistema fintech de tarjetas prepago

Este repositorio contiene un ejemplo didactico de Spring Cloud para un sistema fintech simple de tarjetas prepago. Los proyectos estan separados por servicio:

- `eureka-server`: servidor de descubrimiento Eureka.
- `ms-cuentas`: microservicio responsable de consultar saldos hardcodeados.
- `ms-recargas`: microservicio responsable de aprobar o rechazar recargas consultando `ms-cuentas`.
- `api-gateway`: API Gateway basado en Spring Cloud Gateway.

## Arquitectura

Eureka corre en el puerto `8761` y registra los tres servicios de aplicacion. `ms-cuentas` corre en `8300` y expone saldos en memoria para las cuentas `001`, `002` y `003`. `ms-recargas` corre en `8100`; usa un `RestTemplate` con `@LoadBalanced` para llamar internamente a `http://ms-cuentas/cuentas/saldo/{cuentaId}` mediante Eureka. El gateway corre en `8762` y enruta las rutas publicas `/cuentas/**` hacia `ms-cuentas` y `/recargas/**` hacia `ms-recargas`.

No se usa base de datos, Feign ni persistencia. Todo el comportamiento esta hardcodeado para facilitar la practica.

## Orden de arranque

Ejecuta los servicios en este orden, cada uno desde su carpeta:

1. `eureka-server`
2. `ms-cuentas`
3. `ms-recargas`
4. `api-gateway`

Comandos:

```bash
cd eureka-server
./mvnw spring-boot:run
```

```bash
cd ms-cuentas
./mvnw spring-boot:run
```

```bash
cd ms-recargas
./mvnw spring-boot:run
```

```bash
cd api-gateway
./mvnw spring-boot:run
```

## Endpoints de prueba

Eureka dashboard:

```bash
curl http://localhost:8761
```

Debe mostrar el dashboard de Eureka con `ms-cuentas`, `ms-recargas` y `api-gateway` registrados.

Consulta directa de saldo:

```bash
curl http://localhost:8300/cuentas/saldo/001
```

Respuesta esperada:

```json
{"cuenta":"001","saldo":350.0,"disponible":true,"instancia":"8300"}
```

Recarga aprobada:

```bash
curl http://localhost:8100/recargas/procesar/001/100
```

Recarga rechazada por saldo cero:

```bash
curl http://localhost:8100/recargas/procesar/003/50
```

Consulta de saldo pasando por gateway:

```bash
curl http://localhost:8762/cuentas/saldo/002
```

Recarga pasando por gateway:

```bash
curl http://localhost:8762/recargas/procesar/001/50
```

## Pruebas en Postman

Importa el archivo `postman/sistema-fintech-tarjetas-prepago.postman_collection.json` en Postman. La coleccion incluye variables para los puertos locales y tests automaticos para:

- dashboard de Eureka;
- registro de `MS-CUENTAS`, `MS-RECARGAS` y `API-GATEWAY`;
- consulta directa de saldos;
- recargas aprobadas y rechazadas;
- rutas equivalentes pasando por el gateway.
