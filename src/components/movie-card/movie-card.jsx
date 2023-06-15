//Import the PropTypes library
import PropTypes from "prop-types";

//BookCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => { onMovieClick(movie) }}
    >
      {movie.title}
    </div>
  );
};

//Define all the props constraints for the BookCard
MovieCard.PropTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      deathday: PropTypes.string
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};