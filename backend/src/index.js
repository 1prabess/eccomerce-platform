import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, async () => {
  try {
    connectDb();
    console.log(`App is listening on port: ${PORT}`);
  } catch (error) {
    console.log("Error in listening by app");
  }
});
