import { movieService } from "services";
import { moviesDataProvider } from "data-providers";
import { moviesRepository } from "database";
import {CustomError} from "../../helpers";

jest.mock("data-providers");
jest.mock("database");

describe("Test addMoviesBulk method", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should insert movies in bulk until all pages are fetched", async () => {
    const mockedMovies = Array(10).fill({
      poster: "poster1.jpg",
      title: "Movie 1",
      director: "Director 1",
      plot: "Plot 1",
    });

    // Mock the return value of pullMoviesPageByPage for three consecutive calls
    moviesDataProvider.pullMoviesPageByPage
      .mockResolvedValueOnce(mockedMovies)
      .mockResolvedValueOnce(mockedMovies)
      .mockResolvedValueOnce([]);

    moviesRepository.insertMoviesBulk.mockImplementation();

    await movieService.addMoviesBulk();

    expect(moviesDataProvider.pullMoviesPageByPage).toHaveBeenCalledTimes(3);
    expect(moviesDataProvider.pullMoviesPageByPage).toHaveBeenCalledWith(1);
    expect(moviesDataProvider.pullMoviesPageByPage).toHaveBeenCalledWith(2);
    expect(moviesDataProvider.pullMoviesPageByPage).toHaveBeenCalledWith(3);

    expect(moviesRepository.insertMoviesBulk).toHaveBeenCalledTimes(2);
    expect(moviesRepository.insertMoviesBulk).toHaveBeenCalledWith(
      mockedMovies
    );
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Failed to fetch movies");

    moviesDataProvider.pullMoviesPageByPage.mockRejectedValue(error);

    moviesRepository.insertMoviesBulk.mockImplementation();

    console.error = jest.fn();

    await movieService.addMoviesBulk();

    expect(moviesDataProvider.pullMoviesPageByPage).toHaveBeenCalledTimes(1);
    expect(moviesDataProvider.pullMoviesPageByPage).toHaveBeenCalledWith(1);

    expect(moviesRepository.insertMoviesBulk).not.toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith(
      "Error inserting movies:",
      error
    );
  });
});


describe('Test getMoviesWithPagination method', () => {
  beforeEach(() => {
    // Reset mock functions and clear mock data
    jest.clearAllMocks();
  });

  it('should return paginated movies without keyword', async () => {
    const page = 1;
    const perPage = 10;
    const movies = [
      { title: 'Movie 1', director: 'Director 1', plot: 'Plot 1' },
      { title: 'Movie 2', director: 'Director 2', plot: 'Plot 2' },
    ];
    const totalMoviesCount = 20;

    // Mock the moviesRepository.paginateMovies function
    moviesRepository.paginateMovies.mockResolvedValueOnce({
      movies,
      totalMoviesCount,
    });

    const result = await movieService.getMoviesWithPagination(page, perPage);

    expect(moviesRepository.paginateMovies).toHaveBeenCalledWith(page, perPage);
    expect(result.movies).toEqual(movies);
    expect(result.page).toBe(page);
    expect(result.perPage).toBe(perPage);
    expect(result.totalCount).toBe(totalMoviesCount);
    expect(result.totalPages).toBe(2); // 20 movies with perPage = 10
  });

  it('should return paginated movies with keyword', async () => {
    const page = 1;
    const perPage = 10;
    const keyword = 'action';
    const movies = [
      { title: 'Movie 1', director: 'Director 1', plot: 'Plot 1' },
      { title: 'Movie 2', director: 'Director 2', plot: 'Plot 2' },
    ];
    const totalMoviesCount = 10;

    // Mock the moviesRepository.paginateMoviesByKeyword function
    moviesRepository.paginateMoviesByKeyword.mockResolvedValueOnce({
      movies,
      totalMoviesCount,
    });

    const result = await movieService.getMoviesWithPagination(page, perPage, keyword);

    expect(moviesRepository.paginateMoviesByKeyword).toHaveBeenCalledWith(keyword, page, perPage);
    expect(result.movies).toEqual(movies);
    expect(result.page).toBe(page);
    expect(result.perPage).toBe(perPage);
    expect(result.totalCount).toBe(totalMoviesCount);
    expect(result.totalPages).toBe(1); // 10 movies with perPage = 10
  });

  it('should throw an error for invalid page or perPage', async () => {
    const page = 0; // Invalid page
    const perPage = 20; // Invalid perPage
    const keyword = 'action';

    await expect(movieService.getMoviesWithPagination(page, perPage, keyword)).rejects.toThrow(CustomError);
    expect(moviesRepository.paginateMoviesByKeyword).not.toHaveBeenCalled();
    expect(moviesRepository.paginateMovies).not.toHaveBeenCalled();
  });
});
