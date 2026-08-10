const amqp = require("amqplib");
const { createNotification } = require("../services/notification.service");

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  const channel = await connection.createChannel();

  await channel.assertExchange(
    "cake_delight",
    "fanout",
    { durable: true }
  );

  const queue = await channel.assertQueue(
    "notification_queue",
    { durable: true }
  );

  await channel.bindQueue(
    queue.queue,
    "cake_delight",
    ""
  );

  console.log("Notification Service connected to RabbitMQ");

  channel.consume(queue.queue, async (message) => {
  if (!message) return;

  try {
    const data = JSON.parse(message.content.toString());

    console.log("Received event:", data);

    await createNotification(data);

    console.log("Notification created successfully");

    channel.ack(message);
  } catch (error) {
    console.error("Failed to process notification:", error.message);
  }
  });
};



module.exports = {
  connectRabbitMQ
}; 