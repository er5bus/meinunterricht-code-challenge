import axios from 'axios';
import config from 'config';

export async function pullMoviesPageByPage(page = 1) {
  try {
    const queryParams = {
      apiKey: config.movieThridParty.apiKey,
      s: 'space',
      y: 2001,
      page: page,
    };

    const response = await axios.get(config.movieThridParty.apiEndpoint, {
      params: queryParams,
    });

    const movies = response.data.Search;

    if (!movies) {
      throw new Error('No movies found.');
    }

    const movieDetailsPromises = movies.map(async (movie) => {
      const imdbID = movie.imdbID;
      console.log(`page=${page} fetched movie imdbID=${imdbID}`)
      return axios.get(config.movieThridParty.apiEndpoint, {
        params: {
          apiKey: config.movieThridParty.apiKey,
          i: imdbID,
          plot: 'full',
        },
      });
    });

    const movieDetailsResponses = await Promise.all(movieDetailsPromises);

    const movieDetails = movieDetailsResponses.map((response) => {
      const movie = response.data;
      return {
        poster: movie.Poster,
        title: movie.Title,
        director: movie.Director,
        plot: movie.Plot,
      };
    });

    return movieDetails;
  } catch (error) {
    console.error('Error pulling movies:', error);
    return [];
  }
}

export async function checkMoviesApiHealth() {
  try {
    const queryParams = {
      apiKey: config.movieThridParty.apiKey,
      s: 'space',
      y: 2001,
    };

    const apiHealthResponse = await axios.get(
      config.movieThridParty.apiEndpoint,
      {
        params: queryParams,
      }
    );

    return apiHealthResponse.status === 200;
  } catch (error) {
    return false;
  }
}
