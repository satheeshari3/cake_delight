# Docker and Docker Compose

## Overview

Docker is used to run the full application locally in a containerized environment. The repository includes a Docker Compose file that starts MongoDB, RabbitMQ, the backend services, and the frontend.

## Docker Compose File

File: docker-compose.yml

### Services Included

- mongodb
- rabbitmq
- api-gateway
- catalog-service
- order-service
- rating-service
- notification-service
- frontend

## Service Configuration

### MongoDB

```yaml
mongodb:
  image: mongo:7
  ports:
    - "27017:27017"
  volumes:
    - mongo-data:/data/db
```

MongoDB provides persistent storage for the service-specific databases via a named Docker volume.

### RabbitMQ

```yaml
rabbitmq:
  image: rabbitmq:3-management
  ports:
    - "5672:5672"
    - "15672:15672"
```

This provides the message broker used by the order and notification services.

### API Gateway

```yaml
api-gateway:
  build: ./api-gateway
  ports:
    - "3000:3000"
  environment:
    CATALOG_SERVICE_URL: http://catalog-service:3001
    ORDER_SERVICE_URL: http://order-service:3002
    RATING_SERVICE_URL: http://rating-service:3003
    NOTIFICATION_SERVICE_URL: http://notification-service:3004
```

The gateway runs on port 3000 and forwards requests to internal service names rather than localhost.

### Catalog Service

```yaml
catalog-service:
  build: ./catalog-service
  ports:
    - "3001:3001"
  environment:
    MONGO_URI: mongodb://mongodb:27017/cake_catalog_db
```

### Order Service

```yaml
order-service:
  build: ./order-service
  environment:
    MONGO_URI: mongodb://mongodb:27017/cake_delight_orders
    CATALOG_SERVICE_URL: http://catalog-service:3001
    RABBITMQ_URL: amqp://rabbitmq:5672
```

### Rating Service

```yaml
rating-service:
  build: ./rating-service
  environment:
    MONGO_URI: mongodb://mongodb:27017/cake_rating_db
```

### Notification Service

```yaml
notification-service:
  build: ./notification-service
  environment:
    MONGO_URI: mongodb://mongodb:27017/cake_delight_notifications
    RABBITMQ_URL: amqp://rabbitmq:5672
```

### Frontend

```yaml
frontend:
  build: ./frontend
  ports:
    - "5173:80"
```

The frontend is built using the project Dockerfile and exposed on port 5173 to the host machine.

## Dockerfiles

Each service contains a Dockerfile, and they follow the same general pattern:

- use a Node.js base image
- install dependencies with npm ci
- run the app with npm start

The frontend Dockerfile differs slightly because it builds the React app and serves the static output through Nginx.

## Why Container Names Matter

Inside Docker Compose, containers communicate with each other using service names such as catalog-service and rabbitmq. Using localhost inside one container would point to that same container, not another service.

This is why internal URLs in the environment variables are set to service names instead of host machine addresses.

## Local Commands

From the project root:

```bash
docker compose up --build
```

To stop everything:

```bash
docker compose down
```

## Important Note

The Docker Compose setup is suitable for local development and demonstration. It is not presented as production infrastructure and does not include advanced security, auto-scaling, or managed cloud services.
