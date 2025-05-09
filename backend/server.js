import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/dbConnection.js";
import productRoute from "./src/routes/productRoute.js";
import authRoute from "./src/routes/authRoute.js";
import paymentRoute from "./src/routes/paymentRoute.js";
dotenv.config({});
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/product", productRoute);
app.use("/auth", authRoute);
app.use("/payment", paymentRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});

//to get razorpay key in frontend
app.get("/api/payment/getKey", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});
