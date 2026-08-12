# Event-Driven Communication

## Purpose

The project uses RabbitMQ to decouple the order process from notification creation. Instead of making the order request wait for a notification write, the order service publishes an event and the notification service consumes it asynchronously.

## Flow

1. The user checks out a basket.
2. The order service validates the basket and creates an order.
3. The order service calls publishEvent("order.completed", payload).
4. RabbitMQ receives the event on the cake_delight exchange.
5. The notification service is subscribed to that exchange through a queue called notification_queue.
6. The notification service reads the message, parses it, and creates a notification record.

## Exchange and Queue Setup

### Producer: Order Service

The producer uses an AMQP fanout exchange named cake_delight.

```js
await channel.assertExchange("cake_delight", "fanout", { durable: true });
```

The publish helper sends the payload as JSON:

```js
channel.publish("cake_delight", event, Buffer.from(JSON.stringify(data)));
```

### Consumer: Notification Service

The notification service asserts the same exchange and binds a durable queue named notification_queue to it.

```js
await channel.assertExchange("cake_delight", "fanout", { durable: true });
const queue = await channel.assertQueue("notification_queue", { durable: true });
await channel.bindQueue(queue.queue, "cake_delight", "");
```

Then it consumes messages and stores a notification entry.

## Message Shape

The order service publishes this structure:

```json
{
  "orderId": "...",
  "userId": "...",
  "total": 120,
  "items": [
    { "cakeId": "...", "name": "Strawberry Cake", "price": 40, "quantity": 2 }
  ]
}
```

The notification service reads it and creates a notification message like:

```text
Your order <orderId> has been completed successfully.
```

## Why This Pattern Matters

This pattern keeps the order flow independent from notification processing. The user can continue the experience without waiting for the notification subsystem to finish. It also allows the notification system to be extended later without changing the basket/order service contract.

## Current Limitations

The implementation is simple and intentionally minimal:

- one exchange and one queue are used
- there is no dead-letter queue
- there is no retry policy beyond a basic try/catch
- there is no advanced message acknowledgment strategy beyond ack after successful processing
- there is no service-level validation of whether the notification consumer is available before publishing

This is a solid learning example, but not a full production-grade messaging implementation.
