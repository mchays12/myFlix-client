import PropTypes from 'prop-types';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
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
      <button
        onClick={onBackClick}
        classname="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
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