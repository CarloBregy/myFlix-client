import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername" 
      className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword"
      className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};