const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  channel = await connection.createChannel();

  await channel.assertExchange(
    "cake_delight",
    "fanout",
    { durable: true }
  );

  console.log("RabbitMQ connected successfully");
};

const publishEvent = async (event, data) => {
  channel.publish(
    "cake_delight",
    event,
    Buffer.from(JSON.stringify(data))
  );
};

module.exports = {
  connectRabbitMQ,
  publishEvent
};