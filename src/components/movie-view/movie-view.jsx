import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Form, Button, Col, Container, Card, CardGroup, Row } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);


  return (
    <Container fluid>
      <Row>
        <Col className='mb-3' key={movie.id} md={3} >
          <CardGroup>
            <Card>
              <Card.Body>
                <div>
                  <div>
                    <img className="w-100 h-100" src={movie.ImagePath} />
                  </div>
                  <div>
                    <span> Title: </span>
                    <span> {movie.Title} </span>
                  </div>
                  <div>
                    <span> Director: </span>
                    <span> {movie.Director} </span>
                  </div>
                  <div>
                    <span> Genre: </span>
                    <span> {movie.Genre} </span>
                  </div>
                  <div>
                    <span> Featured: </span>
                    <span> {movie.Featured} </span>
                  </div>
                  <Link to={`/`}>
                    <button
                      classname="back-button"
                    >
                      Back
                    </button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};