const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const basketRoutes = require("./routes/basket.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "order-service",
    message: "Order Service is healthy"
  });
});

app.use("/api/baskets", basketRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;