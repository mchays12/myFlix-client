import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieList } from '../movie-list/movie-list';




export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
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
      <NavigationBar user={user} onLoggedOut={onLogout} />
      <Container>
        <Row className="justify-content-md-center">
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
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </Fragment>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <Fragment>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <div>Loading...</div>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        user={user}
                        setUser={setUser}
                        token={token}
                      />
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
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      movies={movies}
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
                  ) : (
                    <MovieList movies={movies} user={user} />
                  )}
                </Fragment>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );


}


