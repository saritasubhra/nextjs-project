const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  getProfile,
  protect,
} = require("../controllers/authController");

const router = express.Router();

// To disable caching in auth routes
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/profile", protect, getProfile);

module.exports = router;
