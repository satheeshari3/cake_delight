const express = require("express");

const {
  getNotificationsByUser
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/:userId", getNotificationsByUser);

module.exports = router;