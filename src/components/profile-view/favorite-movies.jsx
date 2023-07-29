import React from 'react';
import { Link, Button } from "react-router-dom";

function FavoriteMovies({ FavoriteMoviesList }) {
  return (
    <div>
      <h2> Favorite Movies </h2>
      {FavoriteMoviesList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}> Remove from list </button>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteMovies