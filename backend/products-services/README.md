# products-services

Microservicio proveedor para la demo de microservicios con Spring Boot.

## Tecnologías

- Java 17
- Spring Boot 3
- Gradle
- Spring Web
- Lombok

## Cómo ejecutar

```bash
./gradlew bootRun
```

## Orden correcto

1. Levantar `products-services`
2. Levantar `sales-services`

## Pruebas

```http
GET http://localhost:8081/products
```

```http
GET http://localhost:8081/products/1
```

```http
POST http://localhost:8081/products
Content-Type: application/json

{
  "name": "Teclado Redragon",
  "price": 180.00,
  "stock": 15
}
```

```http
PUT http://localhost:8081/products/1
Content-Type: application/json

{
  "name": "Laptop Lenovo ThinkPad",
  "price": 3650.00,
  "stock": 8
}
```

```http
DELETE http://localhost:8081/products/2
```

Respuesta esperada:

```json
{
  "id": 1,
  "name": "Laptop Lenovo",
  "price": 3500.00,
  "stock": 10
}
```
