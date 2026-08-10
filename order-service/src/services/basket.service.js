const axios = require("axios");
const Basket = require("../models/basket.model");

const addItemToBasket = async (userId, cakeId, quantity) => {
  // Get cake details from Catalog Service
  const response = await axios.get(
    `${process.env.CATALOG_SERVICE_URL}/api/cakes/${cakeId}`
  );

  const cake = response.data.data;

  if (!cake) {
    throw new Error("Cake not found");
  }

  if (!cake.availability) {
    throw new Error("Cake is currently unavailable");
  }

  let basket = await Basket.findOne({ userId });

  if (!basket) {
    basket = new Basket({
      userId,
      items: [],
      total: 0
    });
  }

  const existingItem = basket.items.find(
    (item) => item.cakeId === cakeId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    basket.items.push({
      cakeId: cake._id,
      name: cake.name,
      price: cake.price,
      quantity
    });
  }

  basket.total = basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await basket.save();

  return basket;
};

const getBasket = async (userId) => {
  const basket = await Basket.findOne({ userId });

  if (!basket) {
    return {
      userId,
      items: [],
      total: 0
    };
  }

  return basket;
};


const updateBasketItem = async (userId, cakeId, quantity) => {
  const basket = await Basket.findOne({ userId });

  if (!basket) {
    throw new Error("Basket not found");
  }

  const item = basket.items.find(
    (item) => item.cakeId === cakeId
  );

  if (!item) {
    throw new Error("Cake not found in basket");
  }

  item.quantity = quantity;

  basket.total = basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await basket.save();

  return basket;
};

const removeItemFromBasket = async (userId, cakeId) => {
  const basket = await Basket.findOne({ userId });

  if (!basket) {
    throw new Error("Basket not found");
  }

  const itemExists = basket.items.some(
    (item) => item.cakeId === cakeId
  );

  if (!itemExists) {
    throw new Error("Cake not found in basket");
  }

  basket.items = basket.items.filter(
    (item) => item.cakeId !== cakeId
  );

  basket.total = basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await basket.save();

  return basket;
};

module.exports = {
  addItemToBasket,
  getBasket,
  updateBasketItem,
  removeItemFromBasket
};