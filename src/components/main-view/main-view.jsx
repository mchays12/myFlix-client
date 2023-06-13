import { useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";


export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "John Wick Chapter 4",
      image: "https://m.media-amazon.com/images/M/MV5BOTI1MDA5OTEtNWExMi00NGYwLThmMjUtMDhmNDQ4YTg1NzZlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
      genre: "action",
      director: "Chad Stahelski"
    },
    {
      id: 2,
      title: "John Wick Chapter 3",
      image: "https://m.media-amazon.com/images/M/MV5BYTE0MTE2ZDAtNDNlOC00OGQwLTkxOTUtNzhlMjA1MWJkZWEyXkEyXkFqcGdeQXVyOTkwMTc4ODQ@._V1_.jpg",
      genre: "action",
      director: "Chad Stahelski"
    },
    {
      id: 3,
      title: "John Wick Chapter 2",
      image: "https://m.media-amazon.com/images/I/81zur+RwWHL._AC_UF894,1000_QL80_.jpg",
      genre: "action",
      director: "Chad Stahelski"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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