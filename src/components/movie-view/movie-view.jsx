import PropTypes from "prop-types";
import "../movie-view/movie-view.scss";

import Col from 'react-bootstrap/Col';
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return null;

  return (
    <Col md={8} className="movie-view" >
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.Title}
          className="movie-image"
        />
      )}

      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre?.name || movie.genre}</p>
      <p><strong>Director:</strong> {movie.director?.name || movie.director}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>

      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </Col>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string,
      Genre: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          Name: PropTypes.string,
          Description: PropTypes.string
        })
      ]),
      Director: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          Name: PropTypes.string,
          Bio: PropTypes.string,
          Birth: PropTypes.string
        })
      ]),
      Year: PropTypes.number,
      Rating: PropTypes.number,
      ImagePath: PropTypes.string
    })
  ).isRequired
};
