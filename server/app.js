const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const pizzaRouter = require("./routes/pizzaRoutes");
const cartRouter = require("./routes/cartRoutes");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pizzas", pizzaRouter);
app.use("/api/v1/carts", cartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
