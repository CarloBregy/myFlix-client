import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      {movie.ImagePath && (
        <img
          src={movie.ImagePath}
          alt={movie.title}
          className="movie-image"
        />
      )}

      <h2>{movie.title}</h2>
     <p>{movie.description}</p>
     <p><strong>Genre:</strong> {movie.genre?.name || movie.genre}</p>
     <p><strong>Director:</strong> {movie.director?.name || movie.director}</p>
     <p><strong>Year:</strong> {movie.year}</p>
     <p><strong>Rating:</strong> {movie.rating}</p>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
