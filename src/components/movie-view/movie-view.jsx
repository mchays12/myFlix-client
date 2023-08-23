import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';



export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movieId));
  }, []);



  const removeFavorite = () => {
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}/movies/${movieID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,

      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const addToFavorite = () => {
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}/movies/${movieID}`, {
      method: 'POST',
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
      setUser(data);
    })
  };






  return (

    <Fragment>
      <img
        src={movie.ImagePath}
        width="300"
        alt={movie.Title}
        className="my-4"
      />
      <div className="my-3">
        <strong className="me-2">Title:</strong>
        <span>{movie.Title}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Description:</strong>
        <span>{movie.Description}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Genre:</strong>
        <span>{movie.Genre.Name}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Director:</strong>
        <span>{movie.Director.Name}</span>
      </div>
      <div className="my-4">
        <Link to={`/`}>
          <Button variant="link">Back</Button>
        </Link>

        {isFavorite ? (
          <Button onClick={removeFavorite}> Remove from Favorites </Button>
        ) : (
          <Button onClick={addToFavorite}> Add to Favorites </Button>
        )}


      </div>
    </Fragment>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired

};