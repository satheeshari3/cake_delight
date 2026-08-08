const Cake = require("../models/cake.model");

const createCake = async (cakeData) => {
  const cake = await Cake.create(cakeData);
  return cake;
};

const getAllCakes = async (filters) => {
  const query = {};

  if (filters.name) {
    query.name = {
      $regex: filters.name,
      $options: "i"
    };
  }

  if (filters.category) {
    query.category = {
      $regex: `^${filters.category}$`,
      $options: "i"
    };
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};

    if (filters.minPrice) {
      query.price.$gte = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      query.price.$lte = Number(filters.maxPrice);
    }
  }

  return await Cake.find(query).sort({ createdAt: -1 });
};

const getCakeById = async (cakeId) => {
  return await Cake.findById(cakeId);
};

const updateCake = async (cakeId, updateData) => {
  return await Cake.findByIdAndUpdate(
    cakeId,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteCake = async (cakeId) => {
  return await Cake.findByIdAndDelete(cakeId);
};

module.exports = {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake
};