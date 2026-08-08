const Rating = require("../models/rating.model");


const createRating = async (ratingData) => {
    const rating= await Rating.create(ratingData);
    return rating;
};

const getRatingsByCake = async (cakeId) => {
    return await Rating.find({cakeId}).sort({createdAt: -1});
};

const getAverageRating = async (cakeId) => {


  const result = await Rating.aggregate([
    {
      $match: {
        cakeId: cakeId
      }
    },
    {
      $group: {
        _id: "$cakeId",
        averageRating: {
          $avg: "$rating"
        },
        totalRatings: {
          $sum: 1
        }
      }
    }
  ]);



  if (result.length === 0) {
    return {
      cakeId: cakeId,
      averageRating: 0,
      totalRatings: 0
    };
  }

  return {
    cakeId: cakeId,
    averageRating: Number(result[0].averageRating.toFixed(2)),
    totalRatings: result[0].totalRatings
  };
};

module.exports = {
  createRating,
  getRatingsByCake,
  getAverageRating
};