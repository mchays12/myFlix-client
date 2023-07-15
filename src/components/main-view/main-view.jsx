import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button, Container, Card, CardGroup } from "react-bootstrap";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixappmatthew.herokuapp.com/movies",
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre.Name,
            Director: movie.Director.Name,
            Featured: movie.Featured.toString(),
            ImagePath: movie.ImagePath
          }
        });

        setMovies(moviesFromApi);
      })

      .catch((error) => {
        console.log(error)
      })
  }, [token]);

  return (
    <Row>
      {!user ? (
        <Col className='mb-3' md={6}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />

      ) : movies.length === 0 ? (
        <div> This list needs some shmootsie </div>
      ) : (
        <>
          {movies.map((movie) => (
            <MovieCard
              key={movie.Title}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie)
              }}
            />
          ))}
        </>
      )}
      <Button variant="primary" md="6" onClick={() => { setUser(null); }}>Logout</Button>
    </Row>
  )
}


