import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Movie.css";
import Rating from "./../Rating";

const Movie = ({ movie }) => {
  return (
    <>
      <CardGroup>
        <Card className="my-3 p-3 rounded">
          <Link to={`/movie/${movie._id}`}>
            <Card.Img
              src={movie.image}
              variant="top"
              alt="Movie Poster"
              loading="lazy"
            />
          </Link>
          <Card.Body>
            <Link to={`/movie/${movie._id}`}>
              <Card.Title as="div" className="movie-title">
                <h2>{movie.title}</h2>
              </Card.Title>
            </Link>
            <Card.Text as="h3">Release Year - {movie.releaseYear}</Card.Text>
            <Card.Text as="h3">
              <strong>Genre - {movie.genre}</strong>
            </Card.Text>
            <Card.Text as="h3">
              <Rating value={movie.rating} />
            </Card.Text>
            <Card.Text as="h3" className="CardText">
              {movie.seen ? " Watched" : " Not Watched"}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default Movie;
