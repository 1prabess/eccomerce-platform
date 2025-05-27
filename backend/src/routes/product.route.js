import express from "express";
import { createProduct } from "../controllers/product/createProduct.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";

const productRouter = express.Router();

productRouter.post(
  "/products",
  authenticate,
  authorizeRoles("admin"),
  createProduct
);

export default productRouter;
