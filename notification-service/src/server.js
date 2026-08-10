require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");
const { connectRabbitMQ } = require("./config/rabbitmq");

const PORT = process.env.PORT || 3004;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
  });
};

startServer();