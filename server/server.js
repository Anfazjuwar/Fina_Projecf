const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminOrderCarRouter = require("./routes/admin/CarOrderRoute");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const carRoutes = require("./routes/admin/cars-routs");
const carFillterRoutes = require("./routes/cars/FillterCar");
const CarsAddressRouter = require("./routes/cars/address-routes");
const PublicReviewRouter = require("./routes/cars/review");
const carOrderRouter = require("./routes/cars/CarOder-routes");
const carCartRouter = require("./routes/cars/cart-routers");

const commonFeatureRouter = require("./routes/common/feature-routes");
const dbConnection = require("./dbConfig");

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// cars
app.use("/api/cars", carFillterRoutes);
app.use("/api/cars/address", CarsAddressRouter);

app.use("/api/car/review", PublicReviewRouter);
app.use("/api/car/order", carOrderRouter);
app.use("/api/car/cart", carCartRouter);

//cqars admin
app.use("/api/admin/cars", carRoutes);
app.use("/api/admin/car/orders", adminOrderCarRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
