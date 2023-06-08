import client from './../client';
import { MOVIES_INDEX_NAME } from './../dbindexs/movie.dbindex'

export async function insertMoviesBulk(movies) {
  try {
    const body = movies.flatMap((movie) => [
      { index: { _index: MOVIES_INDEX_NAME } },
      movie,
    ]);

    await client.bulk({ body });
    console.log(`Movies inserted successfully under ${MOVIES_INDEX_NAME}.`);
  } catch (error) {
    console.error('Error inserting movies:', error);
  }
}

export async function paginateMoviesByKeyword(keyword, page, perPage) {
  try {
    const body = await client.search({
      index: MOVIES_INDEX_NAME,
      body: {
        query: {
          multi_match: {
            query: keyword,
            fields: ['title', 'director', 'plot'],
            type: 'phrase_prefix',
          },
        },
        from: (page - 1) * perPage,
        size: perPage,
      },
    });

    const movies = body.hits.hits.map((hit) => hit._source);
    const totalMoviesCount = body.hits.total.value;

    return { movies, totalMoviesCount };
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export async function paginateMovies(page, perPage) {
  try {
    const body = await client.search({
      index: MOVIES_INDEX_NAME,
      body: {
        query: {
          match_all: {},
        },
        from: (page - 1) * perPage,
        size: perPage,
      },
    });

    const movies = body.hits.hits.map((hit) => hit._source);
    const totalMoviesCount = body.hits.total.value;

    return { movies, totalMoviesCount };
  } catch (error) {
    console.error('Error retrieving movies:', error);
    return [];
  }
}
