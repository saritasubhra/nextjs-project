const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pizza name is required"],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
