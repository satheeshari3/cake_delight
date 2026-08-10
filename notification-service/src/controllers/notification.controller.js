const Notification = require("../models/notification.model");

const getNotificationsByUser = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve notifications"
    });
  }
};

module.exports = {
  getNotificationsByUser
};