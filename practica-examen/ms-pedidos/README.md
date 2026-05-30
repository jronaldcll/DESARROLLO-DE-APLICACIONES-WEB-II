# ms-pedidos

Microservicio consumidor para la demo de comunicación síncrona con OpenFeign.

## Tecnologías

- Java 17
- Spring Boot 3
- Gradle
- Spring Web
- OpenFeign
- Lombok

## Cómo ejecutar

```bash
./gradlew bootRun
```

## Orden correcto

1. Levantar `ms-notificaciones`
2. Levantar `ms-pedidos`

## Pruebas

```http
GET http://localhost:8082/sales
```

```http
GET http://localhost:8082/sales/100
```

```http
POST http://localhost:8082/sales
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

```http
PUT http://localhost:8082/sales/100
Content-Type: application/json

{
  "productId": 2,
  "quantity": 1
}
```

```http
DELETE http://localhost:8082/sales/101
```

Respuesta esperada:

```json
{
  "saleId": 100,
  "quantity": 2,
  "total": 7000.00,
  "product": {
    "id": 1,
    "name": "Laptop Lenovo",
    "price": 3500.00,
    "stock": 10
  }
}
```

Si `ms-notificaciones` no está disponible:

```json
{
  "message": "ms-notificaciones no disponible"
}
```
