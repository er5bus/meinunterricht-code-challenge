import "./css/movie.css";

import defaultMoviePoster from './img/default-movie-poster.svg'

const Movie = ({ poster, title, director, plot }) => {
  return (
    <div className="card">
      <img src={poster !== 'N/A' ? poster : defaultMoviePoster} alt={title} />
      <div className="content">
      <h1>{director}</h1>
      <p className="title">{title}</p>
      <p>{plot}</p>
        </div>
    </div>
  );
};

export default Movie;
