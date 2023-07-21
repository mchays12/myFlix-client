import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Form, Button, Col, Container, Card, CardGroup, Row } from "react-bootstrap";

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie, user }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setIsFavorite(isFavorited)
  }, []);

  const removeFavorite = () => {
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
    })
  };

  const addToFavorite = () => {
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
    })
  };

  return (
    <Col className='mb-6' key={movie.id} md={12}>
      <Card className='h-100'>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">
              Open
            </Button>
          </Link>
          {isFavorite ? (
            <Button onClick={removeFavorite}> Remove from Favorites </Button>
          ) : (
            <Button onClick={addToFavorite}> Add to Favorites </Button>
          )}
        </Card.Body>
      </Card>
    </Col>


  );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
};