import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";


export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixappmatthew.herokuapp.com/")
      .then((reponse) => response.json())
      .then((data) => {
        const moviesFromApi = datadocs.map((doc) => {
          return {
            id: doc.key,
            title: doc.Title,
            director: "", /*pretty sure I need an array*/
            genre: "" /*pretty sure I need an array*/
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

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
            key={movie.id}
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