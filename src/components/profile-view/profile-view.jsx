import { Fragment, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.split('T')[0]);

  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });




  const handleSubmit = (event) => {
    event.preventDefault();


    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }



    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("update failed.")
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://myflixappmatthew.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        onLogout();
      } else {
        alert("delete failed")
      }
    })
  };

  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <h1 className="my-3">Profile</h1>
          <div>
            <strong className="me-3">Username:</strong>
            {username}
          </div>
          <div>
            <strong className="me-3">Email:</strong>
            {email}
          </div>

          <Form onSubmit={handleSubmit} className="mt-4">
            <h2>Update Your Profile Information</h2>
            <Form.Group controlId="formUsername" className="my-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                minLength={5}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="my-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                minLength={5}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="my-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBirthday" className="my-3">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                required
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Your Profile
            </Button>
            <Button variant="link" onClick={handleDeleteUser}>
              Delete Your Profile
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <h2>Your Favorite Movies</h2>
        {favoriteMovies.length === 0 ? (
          <Col>You have no favorite movies yet.</Col>
        ) : (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} md={3} className="mb-3">
              <MovieCard movie={movie} user={user} />
            </Col>
          ))
        )}
      </Row>
    </Fragment>
  );

}


