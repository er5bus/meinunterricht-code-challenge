import somethingWrongHappend from './img/something-wrong-happend.svg'

import './css/errorLoadingMovies.css'

const ErrorLoadingMovies = () => {

  return <div className="error-loading-movies-found-section">
      <img width="300" src={somethingWrongHappend} alt="somthing wrong happend" />
      <p> Something wrong happend on loading</p>
    </div>
}

export default ErrorLoadingMovies
