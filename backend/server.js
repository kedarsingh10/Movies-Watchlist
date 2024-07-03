import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import path from "path";

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

//routes
app.use("/api/movies", moviesRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
);

// const __dirname = path.resolve();
// app.get("/", (req, res) => {
//   res.send("API is running....");
// });

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
