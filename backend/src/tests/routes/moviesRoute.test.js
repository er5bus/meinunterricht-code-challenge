import request from "supertest";
import app from "app";
import { movieService } from "services";
import {createMoviesFixture, deleteMovieFixture, movies} from "fixtures/movies.fixture";

jest.mock("database/elasticsearch/dbindexs/movie.dbindex", () => {
  const originalModule = jest.requireActual("database/elasticsearch/dbindexs/movie.dbindex");

  return {
    ...originalModule,
    MOVIES_INDEX_NAME: "movies_test"
  };
});


describe("Test GET /api/v1/movies endpoint", () => {
  beforeAll(async () => {
    await createMoviesFixture()
  });

  it("should return a list of movies", async () => {
    const response = await request(app).get("/api/v1/movies");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movies,
      page: 1,
      perPage: 10,
      totalCount: 2,
      totalPages: 1,
    });
  });

  it("should return a paginated list of movies", async () => {
    const response = await request(app).get(
      "/api/v1/movies?page=2&pageSize=1"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movies: [movies[1]],
      page: 2,
      perPage: 1,
      totalCount: 2,
      totalPages: 2,
    });
  });

  it("should return a filtered list of movies based on keyword search", async () => {
    const response = await request(app).get("/api/v1/movies?keyword=Plot");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movies,
      page: 1,
      perPage: 10,
      totalCount: 2,
      totalPages: 1,
    });
  });


  it("should return a empty list of movies based on keyword search", async () => {
    const response = await request(app).get("/api/v1/movies?keyword=space");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movies: [],
      page: 1,
      perPage: 10,
      totalCount: 0,
      totalPages: 0,
    });
  });

  it("should handle errors gracefully", async () => {
    jest
      .spyOn(movieService, "getMoviesWithPagination")
      .mockRejectedValue(new Error("Failed to fetch movies"));

    const response = await request(app).get("/api/v1/movies");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      cause: "Server error",
      code: 2000,
      message: "Failed to fetch movies",
    });
  });

  afterAll(async () => {
    await deleteMovieFixture()
  });

});
