import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Form, Button, Col, Container, Card, CardGroup, Row } from "react-bootstrap";

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Col className='mb-3' key={movie.id} md={3}>
      <Card className='h-100'>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
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
  onMovieClick: PropTypes.func.isRequired
};