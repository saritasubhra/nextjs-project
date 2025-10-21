const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  getProfile,
  protect,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/profile", protect, getProfile);

module.exports = router;
