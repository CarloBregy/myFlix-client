import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import "../movie-card/movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      {movie.image && (
        <div className="movie-img-container">
          <img src={movie.image} alt={movie.title} />
        </div>
      )}
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <div>Genre: {movie.genre}</div>
        <div>Year: {movie.year}</div>
        <div>Rating: {movie.rating}</div>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    description: PropTypes.string
  }).isRequired
};