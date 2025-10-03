import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-carlo-b-a8e9d78bfbc9.herokuapp.com/movies", {
 
    headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGRlNTRiOGRiNDY1YmY1OGMyMWY3NzQiLCJVc2VybmFtZSI6IkRhdmlkZTJNYXJ0aW5leiIsIlBhc3N3b3JkIjoiJDJiJDEwJGhySm5WVVpINW1GZEFPaUJ3OFZZbS5BYmlKTk14TW5wNkc5M2kyWFBEOS43d0RhR2NYOVJpIiwiRW1haWwiOiJkYXZpZGUyLm1hcnRpbmV6QGV4YW1wbGUuY29tIiwiQmlydGhkYXkiOiIxOTgzLTA3LTIyVDAwOjAwOjAwLjAwMFoiLCJGYXZvcml0ZU1vdmllcyI6W10sIl9fdiI6MCwiaWF0IjoxNzU5NDAxMjQzLCJleHAiOjE3NjAwMDYwNDMsInN1YiI6IkRhdmlkZTJNYXJ0aW5leiJ9.wGSzNdQNkYrHfNIeOgiODRhe94FcnaI-3BNwR7PVEqU"
  }
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,             
          title: movie.Title,
          director: movie.Director?.Name,
          genre: movie.Genre?.Name,
          year: movie.Year,
          rating: movie.Rating,
          image: movie.ImagePath,     
          description: movie.Description,
          genre: movie.Genre?.Name
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The movie list is empty!</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}              // React key for unique identification
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  );
};
