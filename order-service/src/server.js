require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const { connectRabbitMQ } = require("./config/rabbitmq");

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  await connectDatabase();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
  });
};

startServer();