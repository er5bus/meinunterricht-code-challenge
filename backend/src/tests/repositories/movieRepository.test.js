import {
  insertMoviesBulk,
  paginateMoviesByKeyword,
  paginateMovies,
} from "database/elasticsearch/repositories/movie.repository";
import client from "database/elasticsearch/client";
import { MOVIES_INDEX_NAME } from "../../database";

jest.mock("database/elasticsearch/client");

describe("Movie Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Test insertMoviesBulk method", () => {
    test("should insert movies successfully", async () => {
      const movies = [
        { title: "Movie 1", director: "Director 1", plot: "Plot 1" },
        { title: "Movie 2", director: "Director 2", plot: "Plot 2" },
      ];

      const expectedBody = [
        { index: { _index: MOVIES_INDEX_NAME } },
        { title: "Movie 1", director: "Director 1", plot: "Plot 1" },
        { index: { _index: MOVIES_INDEX_NAME } },
        { title: "Movie 2", director: "Director 2", plot: "Plot 2" },
      ];

      await insertMoviesBulk(movies);

      expect(client.bulk).toHaveBeenCalledTimes(1);
      expect(client.bulk).toHaveBeenCalledWith({ body: expectedBody });
    });

    test("should handle error while inserting movies", async () => {
      const movies = [
        { title: "Movie 1", director: "Director 1", plot: "Plot 1" },
        { title: "Movie 2", director: "Director 2", plot: "Plot 2" },
      ];

      const mockError = new Error("Mock Error");

      client.bulk.mockRejectedValueOnce(mockError);

      console.error = jest.fn();

      await insertMoviesBulk(movies);

      expect(client.bulk).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Error inserting movies:",
        mockError
      );
    });
  });

  describe("Tet paginateMoviesByKeyword method", () => {
    test("should return paginated movies by keyword", async () => {
      const keyword = "Action";
      const page = 2;
      const perPage = 10;

      const mockResponse = {
        hits: {
          hits: [
            { _source: { title: "Movie 1" } },
            { _source: { title: "Movie 2" } },
          ],
          total: { value: 20 },
        },
      };

      client.search.mockResolvedValueOnce(mockResponse);

      const result = await paginateMoviesByKeyword(keyword, page, perPage);

      expect(client.search).toHaveBeenCalledTimes(1);
      expect(client.search).toHaveBeenCalledWith({
        index: MOVIES_INDEX_NAME,
        body: {
          query: {
            multi_match: {
              query: keyword,
              fields: ["title", "director", "plot"],
              type: "phrase_prefix",
            },
          },
          from: (page - 1) * perPage,
          size: perPage,
        },
      });

      expect(result).toEqual({
        movies: [{ title: "Movie 1" }, { title: "Movie 2" }],
        totalMoviesCount: 20,
      });
    });

    test("should handle error while searching movies by keyword", async () => {
      const keyword = "Action";
      const page = 2;
      const perPage = 10;

      const mockError = new Error("Mock Error");

      client.search.mockRejectedValueOnce(mockError);

      console.error = jest.fn(); // Mock console.error

      const result = await paginateMoviesByKeyword(keyword, page, perPage);

      expect(client.search).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Error searching movies:",
        mockError
      );
      expect(result).toEqual([]);
    });
  });

  describe("Test paginateMovies method", () => {
    test("should return paginated movies", async () => {
      const page = 2;
      const perPage = 10;

      const mockResponse = {
        hits: {
          hits: [
            { _source: { title: "Movie 1" } },
            { _source: { title: "Movie 2" } },
          ],
          total: { value: 20 },
        },
      };

      client.search.mockResolvedValueOnce(mockResponse);

      const result = await paginateMovies(page, perPage);

      expect(client.search).toHaveBeenCalledTimes(1);
      expect(client.search).toHaveBeenCalledWith({
        index: MOVIES_INDEX_NAME,
        body: {
          query: {
            match_all: {},
          },
          from: (page - 1) * perPage,
          size: perPage,
        },
      });

      expect(result).toEqual({
        movies: [{ title: "Movie 1" }, { title: "Movie 2" }],
        totalMoviesCount: 20,
      });
    });

    test("should handle error while retrieving movies", async () => {
      const page = 2;
      const perPage = 10;

      const mockError = new Error("Mock Error");

      client.search.mockRejectedValueOnce(mockError);

      console.error = jest.fn(); // Mock console.error

      const result = await paginateMovies(page, perPage);

      expect(client.search).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Error retrieving movies:",
        mockError
      );
      expect(result).toEqual([]);
    });
  });
});
