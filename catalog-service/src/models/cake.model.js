const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cake name is required"],
      trim: true,
      minlength: [2, "Cake name must be at least 2 characters"],
      maxlength: [100, "Cake name cannot exceed 100 characters"]
    },

    description: {
      type: String,
      required: [true, "Cake description is required"],
      trim: true,
      maxlength: [500, "Cake description cannot exceed 500 characters"]
    },

    category: {
      type: String,
      required: [true, "Cake category is required"],
      trim: true
    },

    price: {
      type: Number,
      required: [true, "Cake price is required"],
      min: [0, "Cake price cannot be negative"]
    },

    availability: {
      type: Boolean,
      default: true
    },

    imageReference: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;