import { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieFilter } from '../movie-filter/movie-filter';
import { MovieCard } from '../movie-card/movie-card';

export const MovieList = ({ movies, user }) => {
  const [filter, setFilter] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    setFilteredMovies(() =>
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter.trim().toLowerCase())
      )
    );
  }, [filter, movies]);

  return (
    <Fragment>
      <Row className="my-3">
        <MovieFilter filter={filter} setFilter={setFilter} />
      </Row>
      <Row>
        {filteredMovies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <Fragment>
            {filteredMovies.map((movie) => (
              <Col key={movie._id} md={3} className="mb-5">
                <MovieCard movie={movie} user={user} />
              </Col>
            ))}
          </Fragment>
        )}
      </Row>
    </Fragment>
  );
};