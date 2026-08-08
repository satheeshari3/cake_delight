require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Catalog Service running on port ${PORT}`);
  });
};

startServer();