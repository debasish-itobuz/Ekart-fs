import express from "express";
import createProduct from "../controllers/product/createProduct.js";
import { hasToken } from "../middleware/hasToken.js";
import { validateData } from "../middleware/validateData.js";
import { productValidateSchema } from "../validators/productValidate.js";

const productRoute = express.Router();

productRoute.post(
  "/create",
  hasToken,
  validateData(productValidateSchema),
  createProduct
);

export default productRoute;
