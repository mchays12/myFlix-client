import { useState, useEffect, } from "react";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieList } from "../movie-list/movie-list";
import { Fragment, Row, Col, Button, Container, Card, CardGroup } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);




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
            _id: movie._id,
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

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null)
          }}
        />
        <Row>
          <Routes>
            <Route
              path="/signup"
              element={
                <Fragment>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </Fragment>
              }
            />
            <Route
              path="/login"
              element={
                <Fragment>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                    </Col>
                  )}
                </Fragment>
              }
            />

            <Route
              path="/profile"
              element={
                <Fragment>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onLogout={onLogout}
                      />
                    </Col>
                  )}
                </Fragment>
              }
            />

            <Route
              path="/movies/:movieID"
              element={
                <Fragment >
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col> The list is empty </Col>
                  ) : (

                    <MovieView
                      style={{ border: "1px solid green" }}
                      movies={movies}
                      user={user}
                      setUser={setUser}
                      token={token}
                    />
                  )}
                </Fragment>
              }
            />
            <Route
              path="/"
              element={
                <Fragment>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col> The list is empty </Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col >
                          <MovieList movies={movies} user={user} />
                        </Col>
                      ))}
                    </>
                  )}
                </Fragment>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>

  )
}


