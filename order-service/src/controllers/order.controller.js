const orderService = require("../services/order.service");

const checkout = async (req, res) => {
  try {
    const { userId } = req.params;

    const order = await orderService.checkout(userId);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await orderService.getOrdersByUser(userId);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders"
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(
      orderId,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  checkout,
  getOrdersByUser,
  updateOrderStatus
};