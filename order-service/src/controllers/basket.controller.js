const basketService = require("../services/basket.service");

const addItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cakeId, quantity } = req.body;

    const basket = await basketService.addItemToBasket(
      userId,
      cakeId,
      quantity
    );

    res.status(201).json({
      success: true,
      message: "Item added to basket successfully",
      data: basket
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getBasket = async (req, res) => {
  try {
    const { userId } = req.params;

    const basket = await basketService.getBasket(userId);

    res.status(200).json({
      success: true,
      data: basket
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve basket"
    });
  }
};
const updateItem = async (req, res) => {
  try {
    const { userId, cakeId } = req.params;
    const { quantity } = req.body;

    const basket = await basketService.updateBasketItem(
      userId,
      cakeId,
      quantity
    );

    res.status(200).json({
      success: true,
      message: "Basket item updated successfully",
      data: basket
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
const removeItem = async (req, res) => {
  try {
    const { userId, cakeId } = req.params;

    const basket = await basketService.removeItemFromBasket(
      userId,
      cakeId
    );

    res.status(200).json({
      success: true,
      message: "Item removed from basket successfully",
      data: basket
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
  addItem,
  getBasket,
  updateItem,
  removeItem
};