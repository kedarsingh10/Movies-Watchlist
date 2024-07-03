import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Converting Json to JavaScript Object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//log request Path
app.use("/", (req, res, next) => {
  console.log(req.path);
  next();
});

app.get("/", (req, res) => {
  res.send("API is Running...");
});

//routes
app.use("/api/movies", moviesRoutes);

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
