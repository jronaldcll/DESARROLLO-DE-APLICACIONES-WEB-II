# jwt-sales-services

Ejemplo REST basico con mantenimiento de usuarios, login JWT y listado de ventas protegido.

No usa Kafka ni RabbitMQ.

## Endpoints

- `POST /users`: crea un usuario. No requiere token.
- `POST /auth/login`: valida usuario y devuelve JWT.
- `GET /users`: lista usuarios. Requiere `Authorization: Bearer <token>`.
- `PUT /users/{id}`: actualiza usuario. Requiere JWT.
- `DELETE /users/{id}`: elimina usuario. Requiere JWT.
- `GET /sales`: lista ventas de ejemplo. Requiere JWT.

## Ejecutar

Usa la misma base MySQL del proyecto en `localhost:5510/appdb`.

```bash
./gradlew bootRun
```

## Flujo de prueba

Crear usuario:

```http
POST http://localhost:8083/users
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@demo.com",
  "password": "secret123",
  "role": "ADMIN"
}
```

Login:

```http
POST http://localhost:8083/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "secret123"
}
```

Listar ventas con JWT:

```http
GET http://localhost:8083/sales
Authorization: Bearer <token>
```
