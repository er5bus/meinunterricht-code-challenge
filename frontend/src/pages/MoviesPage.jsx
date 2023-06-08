import {useEffect} from "react";
import {
  ErrorLoadingMovies,
  LoadingMovies,
  Movie,
  NoMoviesFound,
  ListMovies,
  SearchBar,
} from "../components";
import { MOVIES_URL } from "../constants";
import { useDataFetch } from "../hooks";

const MoviesPage = () => {
  const { data, isLoading, error, fetchData } = useDataFetch(MOVIES_URL);

  useEffect(() => {
    fetchData()

    // eslint-disable-next-line
  }, [])

  const handleSearch = (keyword) => {
    fetchData(keyword);
  };

  return (
    <>
      <SearchBar onSearchWordChange={handleSearch} />
      {isLoading && <LoadingMovies />}
      {!isLoading && error !== null && <ErrorLoadingMovies />}
      {!isLoading && error === null && data?.movies?.length === 0 && <NoMoviesFound />}
      {error === null && data?.movies?.length !== 0 && <ListMovies>{ data?.movies?.map((movie, idx) => <Movie key={idx} {...movie} />)}</ListMovies> }
    </>
  );
};

export default MoviesPage;
