import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
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
      <button onClick={onBackClick}>Back</button>
    </div>
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