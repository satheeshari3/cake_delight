# API Documentation

## Overview

The frontend communicates with the application through the API gateway at http://localhost:3000/api. The gateway forwards requests to the appropriate backend service.

## Gateway Routes

### Catalog Routes

| Method | Route | Service | Purpose |
| --- | --- | --- | --- |
| GET | /api/cakes             | Catalog | Get all cakes with optional filters |
| GET | /api/cakes/:cakeId     | Catalog | Get a single cake |
| POST | /api/cakes            | Catalog | Create a cake |
| PUT | /api/cakes/:cakeId     | Catalog | Update a cake |
| DELETE | /api/cakes/:cakeId  | Catalog | Delete a cake |

#### GET /api/cakes query parameters

- name: partial string match, case-insensitive
- category: exact category match, case-insensitive
- minPrice: minimum price filter
- maxPrice: maximum price filter

Example:

```http
GET /api/cakes?name=strawberry&category=classic&minPrice=20&maxPrice=100
```

### Rating Routes

| Method | Route | Service | Purpose |
| --- | --- | --- | --- |
| POST | /api/ratings | Rating | Create a new rating |
| GET | /api/ratings/cake/:cakeId | Rating | Get all ratings for a cake |
| GET | /api/ratings/cake/:cakeId/average | Rating | Get the average rating |

### Basket Routes

| Method | Route | Service | Purpose |
| --- | --- | --- | --- |
| POST | /api/baskets/:userId/items | Order | Add item to basket |
| GET | /api/baskets/:userId | Order | Get basket for user |
| PUT | /api/baskets/:userId/items/:cakeId | Order | Update item quantity |
| DELETE | /api/baskets/:userId/items/:cakeId | Order | Remove item from basket |

### Order Routes

| Method | Route | Service | Purpose |
| --- | --- | --- | --- |
| POST | /api/orders/:userId/checkout | Order | Checkout basket and create order |
| GET | /api/orders/:userId | Order | Get user orders |
| PUT | /api/orders/:orderId/status | Order | Update order status |

### Notification Routes

| Method | Route | Service | Purpose |
| --- | --- | --- | --- |
| GET | /api/notifications/:userId | Notification | Get notifications for a user |

## Service-Specific REST Contracts

### Catalog Service

Base URL inside Docker: http://catalog-service:3001

### Order Service

Base URL inside Docker: http://order-service:3002

### Rating Service

Base URL inside Docker: http://rating-service:3003

### Notification Service

Base URL inside Docker: http://notification-service:3004

## Request/Response Notes

- The API gateway returns the downstream response status and payload whenever the backend call succeeds.
- If a backend service is unavailable, the gateway responds with HTTP 500 and a generic message such as "Catalog Service unavailable".
- The gateway does not implement advanced retries or fallback logic.

## Example Flow

```text
Browser
  -> GET /api/cakes
  -> route forwarded to catalog-service /api/cakes
  -> response returned to browser
```

```text
Browser
  -> POST /api/orders/abc123/checkout
  -> gateway forwards to order-service /api/orders/abc123/checkout
  -> order is created
  -> order-service publishes RabbitMQ event
  -> notification-service creates a notification asynchronously
```

## Important Implementation Note

The ratings API stores cake references using a simple cakeId string. There is no active validation against the catalog service when creating a rating. That is a design choice of the current implementation rather than a gateway-level guarantee.
