import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    const dt = new Date();
    let hours = `${dt.getHours() < 10 ? "0" : ""}${dt.getHours()}`;
    let minutes = `${dt.getMinutes() < 10 ? "0" : ""}${dt.getMinutes()}`;
    let seconds = `${dt.getSeconds() < 10 ? "0" : ""}${dt.getSeconds()}`;
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(
        `Server running on port ${PORT} at ${hours}:${minutes}:${seconds}`
      )
    );
  })
  .catch((error) => console.log(error.message));