import express from "express";
import { createProduct } from "../controllers/product/createProduct.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import { getProduct } from "../controllers/product/getProduct.controller.js";

const productRouter = express.Router();

productRouter.post(
  "/products",
  authenticate,
  authorizeRoles("admin"),
  createProduct
);

productRouter.get("/products/:slug", getProduct);

export default productRouter;
