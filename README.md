# Preparación del entorno

## Tecnologías involucradas:
- [NodeJS](https://nodejs.org/es/)
- [NestJS](https://docs.nestjs.com/)
- [Serverless Framework](https://www.serverless.com/framework/docs)

## Requerimientos:
- Node.js (v14 o superior)
- NPM
- MySQL

---

## Archivos de entorno y de configuración

2. Crear los archivos `.env` y `config.yaml`:
```bash
# Una vez ubicados en la raíz del proyecto...
cp .env.example .env
```

```bash
cp src/Shared/config/config.example.yaml src/Shared/config/config.yaml
```

## Crear la base de datos (MySQL)
```sql
CREATE DATABASE `serverless-api-db-hervias`;
```

## Instalación

```bash
npm i
```

## Correr la aplicación

```bash
npm run build && npx serverless offline
```

---

## Documentación
Se puede acceder a la documentación con Open API/Swagger de la API mediante la siguiente ruta:

```bash
<host>/dev/docs
```

Ejemplo:

[http://localhost:3000/dev/docs](http://localhost:3000/dev/docs)
