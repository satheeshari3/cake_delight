require("dotenv").config();


const app = require("./app");
const connectDatabase = require("./config/database");
const seedDatabase = require("./seed/cakes");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectDatabase();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Catalog Service running on port ${PORT}`);
  });
};

startServer();