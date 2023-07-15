import React from "react";
import { useState } from "react";
import { Form, Button, Col, Container, Card, CardGroup, Row } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://myflixappmatthew.herokuapp.com/login?" + new URLSearchParams(data), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("no such user");
        }
      })
      .catch((e) => {
        alert("something went wrong");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Log in</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlID="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username "
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlID="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="3"
                    />
                  </Form.Group>
                  <Button variant="Primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
};
