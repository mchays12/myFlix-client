import React, { useState, useEffect } from "react";
import './profile-view.scss';
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import UserInfo from "./user-info";
import { Form, Button, Col, Container, Card, CardGroup, Row, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { ModalHeader } from "react-bootstrap";

export const ProfileView = ({ movies, user, token, setUser, onLogout }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.BirthDate);
  const [showModal, setShowModal] = useState(false);
  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();


    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }



    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("update failed.")
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        onLogout();
      } else {
        alert("delete failed")
      }
    })
  };

  return (
    <>
      <h1> Profile </h1>
      <Row>
        <Col>
          <div>Username: {user.Username}</div>
          <div>Email: {user.Email} </div>
        </Col>
      </Row>
      <Row>
        <h3> Update your information </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label> Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label> Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label> Email: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label> Birthday: </Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Form>
      </Row>
      <Row>
        <h3> Favorite movies: </h3>
        {favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={4}>
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={handleShowModal}>
        Delete my account
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Delete account </Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to permanantly delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
          <Button variant="primary" onClick={handleCloseModal}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}


