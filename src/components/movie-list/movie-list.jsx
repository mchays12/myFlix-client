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
      <Row >
        <MovieFilter filter={filter} setFilter={setFilter} />
      </Row>
      <Row>
        {filteredMovies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {filteredMovies.map((movie) => (
              <Col key={movie.Id} >
                <MovieCard movie={movie} user={user} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Fragment>
  );
};