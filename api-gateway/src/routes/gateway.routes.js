const express = require("express");
const axios = require("axios");

const router = express.Router();

const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL;
const RATING_SERVICE_URL = process.env.RATING_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;


// ==============================
// CATALOG SERVICE
// ==============================

// Get all cakes
router.get("/cakes", async (req, res) => {
  try {
    const response = await axios.get(
      `${CATALOG_SERVICE_URL}/api/cakes`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Catalog Service unavailable"
    });
  }
});


// Get cake by ID
router.get("/cakes/:cakeId", async (req, res) => {
  try {
    const response = await axios.get(
      `${CATALOG_SERVICE_URL}/api/cakes/${req.params.cakeId}`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Catalog Service unavailable"
    });
  }
});


// Create cake
router.post("/cakes", async (req, res) => {
  try {
    const response = await axios.post(
      `${CATALOG_SERVICE_URL}/api/cakes`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Catalog Service unavailable"
    });
  }
});


// Update cake
router.put("/cakes/:cakeId", async (req, res) => {
  try {
    const response = await axios.put(
      `${CATALOG_SERVICE_URL}/api/cakes/${req.params.cakeId}`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Catalog Service unavailable"
    });
  }
});


// Delete cake
router.delete("/cakes/:cakeId", async (req, res) => {
  try {
    const response = await axios.delete(
      `${CATALOG_SERVICE_URL}/api/cakes/${req.params.cakeId}`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Catalog Service unavailable"
    });
  }
});


// ==============================
// RATING SERVICE
// ==============================

// Create rating
router.post("/ratings", async (req, res) => {
  try {
    const response = await axios.post(
      `${RATING_SERVICE_URL}/api/ratings`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Rating Service unavailable"
    });
  }
});


// Get ratings for cake
router.get("/ratings/cake/:cakeId", async (req, res) => {
  try {
    const response = await axios.get(
      `${RATING_SERVICE_URL}/api/ratings/cake/${req.params.cakeId}`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Rating Service unavailable"
    });
  }
});


// Get average rating
router.get("/ratings/cake/:cakeId/average", async (req, res) => {
  try {
    const response = await axios.get(
      `${RATING_SERVICE_URL}/api/ratings/cake/${req.params.cakeId}/average`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Rating Service unavailable"
    });
  }
});


// ==============================
// BASKET / ORDER SERVICE
// ==============================

// Add item to basket
router.post("/baskets/:userId/items", async (req, res) => {
  try {
    const response = await axios.post(
      `${ORDER_SERVICE_URL}/api/baskets/${req.params.userId}/items`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Order Service unavailable"
    });
  }
});


// Get basket
router.get("/baskets/:userId", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_URL}/api/baskets/${req.params.userId}`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Order Service unavailable"
    });
  }
});


// Update basket item
router.put(
  "/baskets/:userId/items/:cakeId",
  async (req, res) => {
    try {
      const response = await axios.put(
        `${ORDER_SERVICE_URL}/api/baskets/${req.params.userId}/items/${req.params.cakeId}`,
        req.body
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error.message);

      res.status(500).json({
        success: false,
        message: "Order Service unavailable"
      });
    }
  }
);


// Remove basket item
router.delete(
  "/baskets/:userId/items/:cakeId",
  async (req, res) => {
    try {
      const response = await axios.delete(
        `${ORDER_SERVICE_URL}/api/baskets/${req.params.userId}/items/${req.params.cakeId}`
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error.message);

      res.status(500).json({
        success: false,
        message: "Order Service unavailable"
      });
    }
  }
);


// ==============================
// ORDERS
// ==============================

// Checkout
router.post("/orders/:userId/checkout", async (req, res) => {
  try {
    const response = await axios.post(
      `${ORDER_SERVICE_URL}/api/orders/${req.params.userId}/checkout`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Order Service unavailable"
    });
  }
});


// Get user orders
router.get("/orders/:userId", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_URL}/api/orders/${req.params.userId}`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Order Service unavailable"
    });
  }
});


// Update order status
router.put("/orders/:orderId/status", async (req, res) => {
  try {
    const response = await axios.put(
      `${ORDER_SERVICE_URL}/api/orders/${req.params.orderId}/status`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Order Service unavailable"
    });
  }
});


// ==============================
// NOTIFICATION SERVICE
// ==============================

// Get user notifications
router.get("/notifications/:userId", async (req, res) => {
  try {
    const response = await axios.get(
      `${NOTIFICATION_SERVICE_URL}/api/notifications/${req.params.userId}`
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Notification Service unavailable"
    });
  }
});


module.exports = router;