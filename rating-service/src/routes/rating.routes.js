const express = require("express");
const {
    createRating,
    getRatingsByCake,
    getAverageRating
} = require("../controllers/rating.controller");

const router = express.Router();

router.post("/", createRating);

router.get("/cake/:cakeId", getRatingsByCake);

router.get("/cake/:cakeId/average", getAverageRating);


module.exports = router;