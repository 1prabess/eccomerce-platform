import express from "express";
import { createProduct } from "../controllers/product/createProduct.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import { getProduct } from "../controllers/product/getProduct.controller.js";
import { updateProduct } from "../controllers/product/updateProduct.controller.js";
import { deleteProduct } from "../controllers/product/deleteProduct.controller.js";
import { getProducts } from "../controllers/product/getProducts.controller.js";

const productRouter = express.Router();

productRouter.get("/products/:slug", getProduct);

productRouter.get("/products", getProducts);

productRouter.post(
  "/products",
  authenticate,
  authorizeRoles("admin"),
  createProduct
);

productRouter.patch(
  "/products/:id",
  authenticate,
  authorizeRoles("admin"),
  updateProduct
);

export default productRouter;
