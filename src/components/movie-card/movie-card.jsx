import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';

//code for div that shows movie title and is clickable
export const MovieCard = ({ movie, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie._id));
  }, []);


  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <Card.Title>
          {movie.Title}
          {isFavorite && (
            <div className="my-2">
              <Badge bg="info">Favorite</Badge>
            </div>
          )}
        </Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
};