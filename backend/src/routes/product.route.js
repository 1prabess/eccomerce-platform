import express from "express";
import multer from "multer";
import { createProduct } from "../controllers/product/createProduct.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import { updateProduct } from "../controllers/product/updateProduct.controller.js";
import { deleteProduct } from "../controllers/product/deleteProduct.controller.js";
import { getProducts } from "../controllers/product/getProducts.controller.js";
import { getProductById } from "../controllers/product/getProductById.controller.js";
import { getProductBySlug } from "../controllers/product/getProductBySlug.controller.js";

// Store files temporarily in a "temp/" directory
const upload = multer({ dest: "temp/" });

const productRouter = express.Router();

productRouter.get("/products/:slug", getProductBySlug);

productRouter.get("/products/id/:productId", getProductById);

productRouter.get("/products", getProducts);

productRouter.post(
  "/products",
  authenticate,
  authorizeRoles("admin"),
  upload.array("images", 5),
  createProduct
);

productRouter.patch(
  "/products/:id",
  authenticate,
  authorizeRoles("admin"),
  updateProduct
);

productRouter.delete(
  "/products/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteProduct
);

export default productRouter;
