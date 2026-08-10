const express = require("express");

const {
  checkout,
  getOrdersByUser,
  updateOrderStatus
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/:userId/checkout", checkout);
router.get("/:userId", getOrdersByUser);
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;