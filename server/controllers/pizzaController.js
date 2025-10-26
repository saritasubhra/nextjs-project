const path = require("path");
const fs = require("fs");
const Pizza = require("../models/pizzaModel");
const AppError = require("../utils/appError");

const getAllPizzas = async (req, res, next) => {
  try {
    const pizzas = await Pizza.find().select("-description");

    if (!pizzas || pizzas.length === 0) {
      return next(new AppError("No pizzas found", 404));
    }

    res.status(200).json({
      status: "success",
      results: pizzas.length,
      data: pizzas,
    });
  } catch (err) {
    next(err);
  }
};

const getPizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.pizzaId);

    if (!pizza) {
      return next(new AppError("No pizza found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: pizza,
    });
  } catch (err) {
    next(err);
  }
};

const createPizza = async (req, res, next) => {
  try {
    const { name, ingredients, price, description } = req.body;

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newPizza = await Pizza.create({
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      image: imagePath,
      price,
      description,
    });

    res.status(201).json({
      status: "success",
      message: "Pizza created successfully",
      data: newPizza,
    });
  } catch (err) {
    next(err);
  }
};

const updatePizza = async (req, res, next) => {
  try {
    const { name, ingredients, price } = req.body;
    const pizza = await Pizza.findById(req.params.pizzaId);

    if (!pizza) {
      return next(new AppError("No pizza found with that ID", 404));
    }

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = path.join(__dirname, "../public", pizza.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      pizza.image = `/uploads/${req.file.filename}`;
    }

    if (name) pizza.name = name;
    if (ingredients)
      pizza.ingredients = ingredients.split(",").map((i) => i.trim());
    if (price) pizza.price = price;

    await pizza.save();

    res.status(200).json({
      status: "success",
      message: "Pizza updated successfully",
      data: pizza,
    });
  } catch (err) {
    next(err);
  }
};

const deletePizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.pizzaId);

    if (!pizza) {
      return next(new AppError("No pizza found with that ID", 404));
    }

    // Delete image from public/uploads
    const imagePath = path.join(__dirname, "../public", pizza.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Pizza.findByIdAndDelete(req.params.pizzaId);

    res.status(200).json({
      status: "success",
      message: "Pizza deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPizzas,
  getPizza,
  createPizza,
  updatePizza,
  deletePizza,
};
