import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
import {
  useGetMovieByIdQuery,
  useDeleteMovieByIdMutation,
} from "../../slices/moviesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlActionUndo } from "react-icons/sl";

const MovieScreen = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useGetMovieByIdQuery(movieId);

  const [deleteMovie] = useDeleteMovieByIdMutation();

  const deleteMovieHandler = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(movieId);
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Link className="btn btn-light my-5 fs-2 button-size " to="/">
        <SlActionUndo className="me-2" />
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Image
                src={movie.image}
                alt="Movie Poster"
                fluid
                loading="lazy"
              />
            </Col>
            <Col md={5} className="mb-2">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{movie.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="mb-3">
                    <Rating value={movie.rating} />
                  </div>
                  <h4>Release Year: </h4>
                  <span className=" ">{movie.releaseYear}</span>
                  <h4> Genre: </h4> <span className=" ">{movie.genre}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className=" ">
                    {movie.seen ? " Watched" : " Not Watched"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={2}>
              <Link
                className="btn btn-block btn-success m-3 button-size"
                to={`/movie/update/${movie._id}`}
              >
                <LuFileEdit />
                Update
              </Link>
              <Button
                className="btn-block btn-danger m-3 button-size "
                type="button"
                onClick={deleteMovieHandler}
              >
                <RiDeleteBin6Line />
                Delete
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={8}>
              <ListGroup varireviewant="flush">
                <ListGroup.Item>
                  <h4>Description: </h4>{" "}
                  <span className=" ">{movie.description}</span>
                </ListGroup.Item>
                <h2 className="mt-3">Review</h2>
                {movie.review ? (
                  <ListGroup.Item>
                    <p>{movie.review}</p>
                  </ListGroup.Item>
                ) : (
                  <p className=" ">No reviews</p>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MovieScreen;
