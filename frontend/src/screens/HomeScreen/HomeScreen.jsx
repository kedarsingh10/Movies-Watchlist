import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import { useGetMoviesQuery } from "../../slices/moviesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import "./HomeScreen.css";
import { MdSlowMotionVideo } from "react-icons/md";

function HomeScreen() {
  const { pageNumber = 1 } = useParams();
  const { data, isLoading, error } = useGetMoviesQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>
          <Message variant="danger">
            {error?.data?.message || error?.error}
          </Message>
        </>
      ) : (
        <>
          <h1 className="Teal-Blue-Gradient">
            Watchlists
            <MdSlowMotionVideo />
          </h1>
          <Row>
            {data.movies.map((movie) => (
              <Col sm={12} md={6} lg={4} xl={3} key={movie?._id}>
                <Movie movie={movie} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
