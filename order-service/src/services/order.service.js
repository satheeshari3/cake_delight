const Basket = require("../models/basket.model");
const Order = require("../models/order.model");

const { publishEvent } = require("../config/rabbitmq");

const checkout = async (userId) => {
  const basket = await Basket.findOne({ userId });

  if (!basket || basket.items.length === 0) {
    throw new Error("Basket is empty");
  }

  const order = await Order.create({
    userId: basket.userId,
    items: basket.items,
    total: basket.total,
    status: "COMPLETED"
  });

  basket.items = [];
  basket.total = 0;

  await basket.save();

  await publishEvent("order.completed", {
    orderId: order._id,
    userId: order.userId,
    total: order.total,
    items: order.items
  });

  return order;
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ userId }).sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = status;

  await order.save();

  return order;
};

module.exports = {
  checkout,
  getOrdersByUser,
  updateOrderStatus
};