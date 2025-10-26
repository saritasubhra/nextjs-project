const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
      unique: true,
    },
    cartItems: [
      {
        pizzaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1,
          min: [1, "Minimum quantity is 1"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate("cartItems.pizzaId", "name price image");
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
