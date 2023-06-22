import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
//import { LoginView } from "../login-view/login-view";
//import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {

  //const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  //const [user, setUser] = useState(null);
  //const [token, setToken] = useState(null);


  useEffect(() => {
    /* if (!token) {
       return;
     }*/

    fetch("https://myflixappmatthew.herokuapp.com/movies")
      //{
      //headers: { Authorization: `Bearer ${token}` }
      //})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre.Name,
            Director: movie.Director.Name,
            Featured: movie.Featured.toString()
          }
        });
        setMovies(moviesFromApi);
      });
  }); //[token]);

  /*if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
        or
        <SignupView />
      </>
    );
  }*/

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() =>
        setSelectedMovie(null)}
      />
    );
  };

  if (movies.length === 0) {
    return <div> This list needs some shmootsie </div>
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.Title}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}

    </div>
  );

};

