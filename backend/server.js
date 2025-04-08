import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/dbConnection.js";
import productRoute from "./src/routes/productRoute.js";
import authRoute from "./src/routes/authRoute.js";
dotenv.config({});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/product", productRoute);
app.use("/auth", authRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
