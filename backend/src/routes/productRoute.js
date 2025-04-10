import express from "express";
import createProduct from "../controllers/product/createProduct.js";
import { hasToken } from "../middleware/hasToken.js";
import { validateData } from "../middleware/validateData.js";
import { productValidateSchema } from "../validators/productValidate.js";
import { getAllProducts } from "../controllers/product/getProducts.js";
import { getProductById } from "../controllers/product/getProductById.js";
import updateProduct from "../controllers/product/updateProduct.js";

const productRoute = express.Router();

productRoute.post(
  "/create",
  hasToken,
  validateData(productValidateSchema),
  createProduct
);
productRoute.get("/getAll", hasToken, getAllProducts);
productRoute.get("/getById/:id", hasToken, getProductById);
productRoute.put("/update/:id", hasToken, updateProduct);

export default productRoute;
