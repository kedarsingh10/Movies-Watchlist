import express from "express";
import {
  getMovies,
  getMoviesById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.route("/").get(getMovies).post(addMovie);
router.route("/:id").get(getMoviesById).put(updateMovie).delete(deleteMovie);

export default router;
