import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button, Container, Card, CardGroup } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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
    <BrowserRouter>
      <Row>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty </Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty </Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>

    /* {
   !user ? (
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
     <Button mt="auto" variant="primary" md="6" onClick={() => { setUser(null); }}>Logout</Button>
   </>
 )
 }

   </Row >*/
  )
}


