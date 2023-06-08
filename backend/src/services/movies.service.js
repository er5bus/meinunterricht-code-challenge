import { moviesRepository } from 'database';
import { moviesDataProvider } from 'data-providers'
import {CustomError} from '../helpers';

export async function addMoviesBulk() {
  try {
    const moviesPerPage = 10
    let page = 1, movies = []
    do {
      movies = await moviesDataProvider.pullMoviesPageByPage(page);
      if (movies.length > 0) {
        await moviesRepository.insertMoviesBulk(movies);
        console.log(`Inserted ${movies.length} movies from page ${page}.`);
        page++;
      }
    }while (movies.length == moviesPerPage)
  } catch (error) {
    console.error('Error inserting movies:', error);
  }
}

export async function getMoviesWithPagination(page = 1, perPage = 10, keyword) {

  if (page <= 0 || perPage < 0 || perPage > 1000) {
    throw new CustomError("Invalid page or perPage", 1001, "Invalid parameters");
  }

  let paginatedMovies;

  if (keyword) {
    paginatedMovies = await moviesRepository.paginateMoviesByKeyword(keyword, page, perPage);
  } else {
    paginatedMovies = await moviesRepository.paginateMovies(page, perPage);
  }

  const totalPages = Math.ceil(paginatedMovies.totalMoviesCount / perPage);

  return {
    movies: paginatedMovies.movies,
    page,
    perPage,
    totalCount: paginatedMovies.totalMoviesCount,
    totalPages,
  };
}
