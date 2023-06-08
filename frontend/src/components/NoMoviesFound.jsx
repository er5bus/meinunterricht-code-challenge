import noMoviesFound from './img/no-found.svg'

import './css/noMoviesFound.css'

const NoMoviesFound = () => {

  return <div className="no-movies-found-section">
      <img width="300" src={noMoviesFound} alt="no movies found" />
      <p> No movies found</p>
    </div>
}

export default NoMoviesFound
