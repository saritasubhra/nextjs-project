const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  getAllPizzas,
  getPizza,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzaController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.route("/").get(getAllPizzas).post(upload.single("image"), createPizza);
router.route("/:userId").get(getPizza).patch(updatePizza).delete(deletePizza);

module.exports = router;
