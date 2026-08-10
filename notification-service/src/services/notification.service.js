const Notification = require("../models/notification.model");

const createNotification = async (data) => {
  const notification = await Notification.create({
    userId: data.userId,
    orderId: data.orderId,
    message: `Your order ${data.orderId} has been completed successfully.`,
    status: "SENT"
  });

  return notification;
};

module.exports = {
  createNotification
};