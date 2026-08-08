const cakeService = require("../services/cake.service");

const createCake = async (req, res) => {
  try {
    const cake = await cakeService.createCake(req.body);

    res.status(201).json({
      success: true,
      message: "Cake created successfully",
      data: cake
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getAllCakes = async (req, res) => {
  try {
    const cakes = await cakeService.getAllCakes(req.query);

    res.status(200).json({
      success: true,
      count: cakes.length,
      data: cakes
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve cakes"
    });
  }
};

const getCakeById = async (req, res) => {
  try {
    const cake = await cakeService.getCakeById(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found"
      });
    }

    res.status(200).json({
      success: true,
      data: cake
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Invalid cake ID"
    });
  }
};

const updateCake = async (req, res) => {
  try {
    const cake = await cakeService.updateCake(
      req.params.id,
      req.body
    );

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cake updated successfully",
      data: cake
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteCake = async (req, res) => {
  try {
    const cake = await cakeService.deleteCake(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cake deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Invalid cake ID"
    });
  }
};

module.exports = {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake
};