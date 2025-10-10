import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
    
  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movie-api-carlo-b-a8e9d78bfbc9.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
    
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          onLoggedIn(data.user,data.token);
        } else {
          setError("Login failed. Check your username or password.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Something went wrong during login.");
      });
  };

return (
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};