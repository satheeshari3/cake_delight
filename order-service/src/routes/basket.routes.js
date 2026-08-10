const express = require("express");

const {
  addItem,
  getBasket,
  updateItem,
  removeItem
} = require("../controllers/basket.controller");

const router = express.Router();

router.post("/:userId/items", addItem);

router.get("/:userId", getBasket);

router.put("/:userId/items/:cakeId", updateItem);

router.delete("/:userId/items/:cakeId", removeItem);

module.exports = router;