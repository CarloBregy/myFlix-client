import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
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
          genre: movie.Genre?.Name,
        }));

        setMovies(moviesFromApi);
      })

      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <Col md={12}>
          <div>The movie list is empty!</div>
        </Col>
      ) : (
        <>
          <div className= "h-100 logout-container text-end me-4 mt-4 mb-4">
            <Button
              variant="primary"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </div>

          <Row className="justify-content-center">
            {movies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={3} className="mb-4 d-flex">
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) =>
                    setSelectedMovie(newSelectedMovie)
                  }
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Row>
  );
};
