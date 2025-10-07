import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          className="movie-image"
        />
      )}
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,   // optional
    director: PropTypes.string, // optional
    genre: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    description: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
