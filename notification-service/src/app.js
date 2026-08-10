const express = require("express");

const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(express.json());

app.use("/api/notifications", notificationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "notification-service"
  });
});

module.exports = app;