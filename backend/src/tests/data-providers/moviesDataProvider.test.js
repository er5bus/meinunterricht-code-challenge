import axios from "axios";
import { pullMoviesPageByPage } from "data-providers/movies.dataProvider";
import config from "config";

jest.mock("axios");

describe("Test pullMoviesPageByPage method", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return movie details for each movie", async () => {
    const moviesResponse = {
      data: {
        Search: [
          { imdbID: "tt123", Title: "Movie 1" },
          { imdbID: "tt456", Title: "Movie 2" },
        ],
      },
    };

    const detailsResponse1 = {
      data: {
        Poster: "poster1.jpg",
        Title: "Movie 1",
        Director: "Director 1",
        Plot: "Plot 1",
      },
    };

    const detailsResponse2 = {
      data: {
        Poster: "poster2.jpg",
        Title: "Movie 2",
        Director: "Director 2",
        Plot: "Plot 2",
      },
    };

    axios.get.mockResolvedValueOnce(moviesResponse);
    axios.get.mockResolvedValueOnce(detailsResponse1);
    axios.get.mockResolvedValueOnce(detailsResponse2);

    const result = await pullMoviesPageByPage(1);

    expect(result).toEqual([
      {
        poster: "poster1.jpg",
        title: "Movie 1",
        director: "Director 1",
        plot: "Plot 1",
      },
      {
        poster: "poster2.jpg",
        title: "Movie 2",
        director: "Director 2",
        plot: "Plot 2",
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith(config.movieThridParty.apiEndpoint, {
      params: {
        apiKey: config.movieThridParty.apiKey,
        s: "space",
        y: 2001,
        page: 1,
      },
    });
    expect(axios.get).toHaveBeenCalledWith(config.movieThridParty.apiEndpoint, {
      params: {
        apiKey: config.movieThridParty.apiKey,
        i: "tt123",
        plot: "full",
      },
    });
    expect(axios.get).toHaveBeenCalledWith(config.movieThridParty.apiEndpoint, {
      params: {
        apiKey: config.movieThridParty.apiKey,
        i: "tt456",
        plot: "full",
      },
    });
  });

  it("should handle error and return an empty array", async () => {
    const mockError = new Error("API error");
    console.error = jest.fn();

    axios.get.mockRejectedValueOnce(mockError);

    const result = await pullMoviesPageByPage(1);

    expect(console.error).toHaveBeenCalledWith(
      "Error pulling movies:",
      mockError
    );

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(config.movieThridParty.apiEndpoint, {
      params: {
        apiKey: config.movieThridParty.apiKey,
        s: "space",
        y: 2001,
        page: 1,
      },
    });
  });
});
