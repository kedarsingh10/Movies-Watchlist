import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Movies from "./models/moviesModel.js";
import moviesDB from "./data/moviesDB.js";
import colors from "colors";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Movies.deleteMany();

    await Movies.insertMany(moviesDB);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Movies.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
