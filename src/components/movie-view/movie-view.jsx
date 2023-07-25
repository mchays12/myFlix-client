import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Form, Button, Col, Container, Card, CardGroup, Row } from "react-bootstrap";


export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setIsFavorite(isFavorited)
  }, []);

  const movie = movies.find((m) => m._id === movieId);

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
      setUser(data);
    })
  };

  const addToFavorite = () => {
    console.log(movieId);
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
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
      setUser(data);
    })
  };






  return (

    <div>
      <div>
        <img className="w-100 h-100" src={movie.ImagePath} />
      </div>
      <div>
        <span> Title: </span>
        <span> {movie.Title} </span>
      </div>
      <div>
        <span> Director: </span>
        <span> {movie.Director.Name} </span>
      </div>
      <div>
        <span> Genre: </span>
        <span> {movie.Genre.Name} </span>
      </div>
      <div>
        <span> Featured: </span>
        <span> {movie.Featured.toString()} </span>
      </div>
      {isFavorite ? (
        <Button onClick={removeFavorite}> Remove from Favorites </Button>
      ) : (
        <Button onClick={addToFavorite}> Add to Favorites </Button>
      )}

      <Link to={`/`}>
        <button
          className="back-button"
        >
          Back
        </button>
      </Link>
    </div>
  );
};

/*MovieView.propTypes = {
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

};*/