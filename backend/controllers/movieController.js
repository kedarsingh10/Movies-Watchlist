import Movies from "../models/moviesModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all Movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Movies.countDocuments({});
  const movies = await Movies.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (movies) {
    return res.json({ movies, page, pages: Math.ceil(count / pageSize) });
  }
  res.status(404);
  throw new Error("Resource Not Found");
});

// @desc    Fetch single Movies
// @route   GET /api/Movies/:id
// @access  Public
const getMoviesById = asyncHandler(async (req, res) => {
  const movies = await Movies.findById(req.params.id);
  if (movies) {
    return res.json(movies);
  } else {
    res.status(404);
    throw new Error("movie not found");
  }
});

// @desc    Create a movies
// @route   POST /api/movies
// @access  Public
const addMovie = asyncHandler(async (req, res) => {
  const { title, description, releaseYear, genre, seen, rating, review } =
    req.body;

  const movie = new Movies({
    title,
    image: "/images/movie_image.png",
    description,
    releaseYear,
    genre,
    seen,
    rating,
    review,
  });

  const createdMovies = await movie.save();
  res.status(201).json(createdMovies);
});

// @desc    Update a movies
// @route   PUT /api/movies/:id
// @access  Public
const updateMovie = asyncHandler(async (req, res) => {
  const { title, description, releaseYear, genre, seen, rating, review } =
    req.body;
  const movie = await Movies.findById(req.params.id);
  if (movie) {
    movie.title = title;
    movie.image = "/images/movie_image.png";
    movie.description = description;
    movie.releaseYear = releaseYear;
    movie.genre = genre;
    movie.seen = seen;
    movie.rating = rating;
    movie.review = review || null;
    const updatedMovie = await movie.save();
    res.status(201).json(updatedMovie);
  } else {
    res.status(404);
    throw new Error("Movie not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/movies/:id
// @access  Public
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movies.findById(req.params.id);

  if (movie) {
    await Movies.deleteOne({ _id: movie._id });
    res.json({ message: "movie removed" });
  } else {
    res.status(404);
    throw new Error("movie not found");
  }
});

export { getMovies, getMoviesById, addMovie, updateMovie, deleteMovie };
