const express = require("express");

const {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake
} = require("../controllers/cake.controller");

const router = express.Router();

router.post("/", createCake);
router.get("/", getAllCakes);
router.get("/:id", getCakeById);
router.put("/:id", updateCake);
router.delete("/:id", deleteCake);

module.exports = router;