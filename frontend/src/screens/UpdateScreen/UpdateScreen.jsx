import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";
import Toggle from "react-toggle";
import {
  useUpdateMovieByIdMutation,
  useAddMovieMutation,
  useGetMovieByIdQuery,
} from "../../slices/moviesApiSlice";

import { toast } from "react-toastify";
import { SlActionUndo } from "react-icons/sl";
import { LuFileEdit } from "react-icons/lu";

import "./UpdateScreen.css";

const UpdateScreen = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    refetch,
    error,
  } = useGetMovieByIdQuery(movieId, { skip: !movieId });

  const [updateMovie, { isLoading: loadingUpdate }] =
    useUpdateMovieByIdMutation();

  const [addMovie, { isLoading: loadingInsert }] = useAddMovieMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [seen, setSeen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (movie) {
      try {
        await updateMovie({
          movieId,
          title,
          description,
          releaseYear,
          genre,
          seen,
          rating,
          review,
        }).unwrap(); // NOTE: we need to unwrap the Promise to catch any rejection in our catch block
        refetch();
        toast.success("Movie Detailes Updated Successfully");
        navigate(`/movie/${movieId}`);
        return;
      } catch (updateError) {
        return toast.error(updateError?.data?.message || updateError.error);
      }
    }

    try {
      const response = await addMovie({
        title,
        description,
        releaseYear,
        genre,
        seen,
        rating,
        review,
      }).unwrap(); // NOTE: we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Movie Added Successfully");
      navigate(`/movie/${response._id}`);
      return;
    } catch (addMovieError) {
      toast.error(addMovieError?.data?.message || addMovieError.error);
    }
  };

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
      setSeen(movie.seen);
      setRating(movie.rating);
      setReview(movie.review);
    }
    if (!movieId) {
      setTitle("");
      setDescription("");
      setReleaseYear("");
      setGenre("");
      setSeen(false);
      setRating(0);
      setReview("");
    }
  }, [movie, movieId]);

  return (
    <>
      <Link className="btn btn-light my-5 fs-2 button-size" to="/">
        <SlActionUndo className="me-2" />
        Go Back
      </Link>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Movie Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              required
              placeholder="Movie Title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Release Year
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              required
              placeholder="Release Year"
              defaultValue={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Genre
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              required
              placeholder="Genre"
              defaultValue={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Rating
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="0">Open this select menu</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              required
              rows={5}
              style={{ resize: "none" }}
              placeholder="Description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }} className="toggleText">
            <Toggle
              id="cheese-status"
              checked={seen}
              onChange={() => setSeen(!seen)}
            />
            <span className="ml-3">{seen ? "Watched" : "Not Watched"}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Review
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Review"
              defaultValue={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" className="button-size">
              <LuFileEdit />

              {movie ? "Update" : "Add"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default UpdateScreen;
