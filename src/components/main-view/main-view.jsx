import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
 
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

 useEffect(() => {
   if (!token) return;

    fetch("https://movie-api-carlo-b-a8e9d78bfbc9.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }
  
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
<div>
    <div className="logout-container">
      <button 
      className="logout-button"
      onClick={() => { 
        setUser(null);
        setToken(null);
        localStorage.clear(); 
      }}>
        Logout
      </button>
    </div>

    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  </div>
);
};
