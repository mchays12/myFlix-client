//Import the PropTypes library
import PropTypes from "prop-types";

//BookCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => { onMovieClick(movie) }}
    >
      {movie.Title}
    </div>
  );
};

//Define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};