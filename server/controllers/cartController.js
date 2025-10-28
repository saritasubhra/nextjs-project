const Cart = require("../models/cartModel");
const Pizza = require("../models/pizzaModel");
const AppError = require("../utils/appError");

const createOrUpdateCart = async (req, res, next) => {
  try {
    const { userId, pizzaId, quantity } = req.body;

    if (!userId || !pizzaId) {
      return next(new AppError("userId and pizzaId are required", 400));
    }

    const pizza = await Pizza.findById(pizzaId);
    if (!pizza) {
      return next(new AppError("Pizza not found", 404));
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const existingItem = cart.cartItems.find(
        (item) => item.pizzaId._id.toString() === pizzaId
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.cartItems.push({ pizzaId, quantity: quantity || 1 });
      }

      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        cartItems: [{ pizzaId, quantity: quantity || 1 }],
      });
    }

    cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.pizzaId",
      "name price images"
    );

    res.status(200).json({
      status: "success",
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("user", "name email");

    if (!carts || carts.length === 0) {
      return next(new AppError("No carts found", 404));
    }

    res.status(200).json({
      status: "success",
      results: carts.length,
      data: carts,
    });
  } catch (err) {
    next(err);
  }
};

const getUserCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId });

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOneAndDelete({ user: userId });

    if (!cart) {
      return next(new AppError("No cart found for this user", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Cart deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { pizzaId } = req.body;

    if (!userId || !pizzaId) {
      return next(new AppError("userId and pizzaId are required", 400));
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError("No cart found for this user", 404));
    }

    const updatedItems = cart.cartItems.filter(
      (item) => item.pizzaId._id.toString() !== pizzaId
    );

    if (updatedItems.length === cart.cartItems.length) {
      return next(new AppError("Item not found in cart", 404));
    }

    cart.cartItems = updatedItems;
    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Item removed successfully",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrUpdateCart,
  getAllCarts,
  getUserCart,
  deleteCart,
  removeCartItem,
};
