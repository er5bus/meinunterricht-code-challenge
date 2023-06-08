import client from "database/elasticsearch/client";

export const movies = [
  { title: "Movie 1", director: "Director 1", plot: "Plot 1" },
  { title: "Movie 2", director: "Director 2", plot: "Plot 2" },
];

export const moviesTestIndexName = "movies_test";

export const createMoviesFixture = async () => {
  try {
    const exists = await client.indices.exists({ index: moviesTestIndexName });

    if (!exists) {
      await client.indices.create({
        index: moviesTestIndexName,
        body: {
          mappings: {
            properties: {
              title: { type: "text" },
              director: { type: "text" },
              plot: { type: "text" },
            },
          },
        },
      });
    }
    const body = movies.flatMap((movie) => [
      { index: { _index: moviesTestIndexName } },
      movie,
    ]);

    await client.bulk({ body });

    await client.indices.refresh({ index: moviesTestIndexName });
    console.log(`Movies inserted successfully under ${moviesTestIndexName}.`);
  } catch (error) {
    console.error("Error inserting movies:", error);
  }
};

export async function deleteMovieFixture() {
  const response = await client.indices.delete({
    index: [moviesTestIndexName],
  });

  if (response && response.acknowledged) {
    console.log(`Index "${moviesTestIndexName}" deleted successfully.`);
  } else {
    console.error(`Failed to delete Index "${moviesTestIndexName}"`);
  }
}
