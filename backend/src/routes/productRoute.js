import express from "express";
import { hasToken } from "../middleware/hasToken.js";
import { validateData } from "../middleware/validateData.js";
import { productValidateSchema } from "../validators/productValidate.js";
import { getAllProducts } from "../controllers/product/getProducts.js";
import { getProductById } from "../controllers/product/getProductById.js";
import updateProduct from "../controllers/product/updateProduct.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";
import { searchSortPaginateProduct } from "../controllers/product/sortSearchPaginate.js";
import { upload } from "../controllers/product/fileController.js";
import { createProduct } from "../controllers/product/createProduct.js";

const productRoute = express.Router();

productRoute.get("/getAll", hasToken, getAllProducts);
productRoute.get("/getById/:id", hasToken, getProductById);
productRoute.put("/update/:id", hasToken, upload.single("pic"), updateProduct);
productRoute.delete("/delete/:id", hasToken, deleteProduct);
productRoute.get("/searchSortPaginate", hasToken, searchSortPaginateProduct);
productRoute.post(
  "/create",
  hasToken,
  upload.single("pic"),
  validateData(productValidateSchema),
  createProduct
);
export default productRoute;
