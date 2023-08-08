import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Form, Button, Col, Container, Card, CardGroup, Row } from "react-bootstrap";

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie }) => {







  return (
    <Col>
      <Card className='h-100'>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">
              Open
            </Button>
          </Link>

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