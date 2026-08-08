
const ratingService = require("../services/rating.service")

const createRating = async (req, res) => {
    try{
        const rating =await ratingService.createRating(req.body);

        res.status(201).json({
            success : true,
            message : "Rating submitted succesfully",
            data : rating
        });
    }catch(error){
        console.error(error);

        res.status(400).json({
            success: false,
            message : error.message
        });
    }
};
const getRatingsByCake = async (req, res) => {
  try {
    const ratings = await ratingService.getRatingsByCake(
      req.params.cakeId
    );

    res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve ratings"
    });
  }
};

const getAverageRating = async (req, res) => {
  try {
    const result = await ratingService.getAverageRating(
      req.params.cakeId
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to calculate average rating"
    });
  }
};

module.exports = {
  createRating,
  getRatingsByCake,
  getAverageRating
};