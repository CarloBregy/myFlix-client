import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://movie-api-carlo-b-a8e9d78bfbc9.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup failed");
        }

        alert("Signup successful! Logging you in...");

        return fetch("https://movie-api-carlo-b-a8e9d78bfbc9.herokuapp.com/login", {
          method: "POST",
          body: JSON.stringify({
            Username: username,
            Password: password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        alert("You are now logged in!");
        window.location.reload(); 
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

 return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signupUsername" className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="signupPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupEmail" className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupBirthday" className="mb-3">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
};
