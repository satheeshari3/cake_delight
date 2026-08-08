const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const cakeRoutes = require("./routes/cake.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "catalog-service",
    status: "UP"
  });
});

app.use("/api/cakes", cakeRoutes);

module.exports = app;