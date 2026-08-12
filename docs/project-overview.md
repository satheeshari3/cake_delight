# Project Overview

Cake Delight is a cloud-native microservices demo application for browsing a cake catalog, building a basket, placing orders, and receiving order notifications. The repository is organized around a frontend, an API gateway, and multiple backend services, each with its own Node.js/Express application and MongoDB database.

## Purpose

The project demonstrates how a typical e-commerce-style domain can be split into independent services while still being usable as a single application from the frontend. The main patterns in use are:

- REST-based service-to-service communication via the API gateway
- Domain separation by responsibility
- MongoDB persistence per service
- RabbitMQ-driven event communication for asynchronous workflows
- Docker Compose orchestration for local development
- Kubernetes manifests for basic cluster deployment

## System Components

| Component | Role | Notes |
| --- | --- | --- |
| Frontend | User interface | React app served through Nginx in Docker |
| API Gateway | Central request entry point | Forwards requests to backend services |
| Catalog Service | Cake catalog management | Own MongoDB database |
| Order Service | Basket and checkout | Publishes order events to RabbitMQ |
| Rating Service | Reviews and ratings | Stores cakeId references |
| Notification Service | Async notifications | Consumes RabbitMQ messages |
| MongoDB | Data store | Multiple databases for different services |
| RabbitMQ | Event bus | Fanout exchange used for async event delivery |

## Core User Flow

1. A user opens the frontend and loads the catalog.
2. The frontend calls the gateway at http://localhost:3000/api.
3. The gateway forwards catalog, basket, rating, and notification requests to the relevant service.
4. The user adds cakes to a basket and checks out.
5. The order service creates an order, clears the basket, and publishes an order completion event.
6. The notification service consumes the event and stores a notification record.

## Current Scope

This repository implements a working microservice sample rather than a full enterprise production platform. It includes:

- local Docker orchestration
- service-specific MongoDB databases
- event-driven notification flow
- a frontend that consumes the gateway
- Kubernetes resource manifests for deployment simulation

It does not include advanced production features such as authentication, centralized logging, monitoring dashboards, tracing, secrets management, or automated CI/CD pipelines.

## Local Access Points

When running with Docker Compose:

- Frontend: http://localhost:5173
- API Gateway: http://localhost:3000
- RabbitMQ Management: http://localhost:15672
- MongoDB: localhost:27017

## Design Summary

The project is intentionally simple and educational. Each service owns its own data and exposes a focused REST API. The gateway centralizes access for the frontend, and RabbitMQ isolates notification delivery from the immediate order request flow.
