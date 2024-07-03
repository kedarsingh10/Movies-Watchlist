import { mongoose } from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Movies = mongoose.model("Movies", movieSchema);

export default Movies;
