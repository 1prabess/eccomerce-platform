import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import responseFormatter from "./middlewares/response.middleware.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(responseFormatter);

app.use("/api", authRouter);
app.use("/api", productRouter);

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`App is listening on port: ${PORT}`);
  } catch (error) {
    console.log("Error in listening by app");
  }
});
