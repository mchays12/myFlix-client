import React from 'react';
import { Link, Button } from "react-router-dom";

function FavoriteMovies({ favoriteMoviesList }) {
  return (
    <div>
      <h2> Favorite Movies </h2>
      {favoriteMoviesList.map((movies) => {
        return (
          <div key={movies.id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies.id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies.id)}> Remove from list </button>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteMovies