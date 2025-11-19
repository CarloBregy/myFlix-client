import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-carlo-b-a8e9d78bfbc9.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Failed to fetch movies:", error));
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          {/* Signup Route */}
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
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
              )
            }
          />

          {/* Movie Detail Route */}
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The movie list is empty!</Col>
              ) : (
                <MovieView movies={movies} />
              )
            }
          />

          {/* Home / Movie List Route */}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col md={12}>
                  <div>The movie list is empty!</div>
                </Col>
              ) : (
                <>
                  <div className="h-100 logout-container text-end me-4 mt-4 mb-4">
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
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
