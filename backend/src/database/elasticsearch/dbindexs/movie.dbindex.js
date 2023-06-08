import {createIndex, deleteIndex} from ".";

export const MOVIES_INDEX_NAME = "movies";
const MOVIES_INDEX_SCHEMA = {
  mappings: {
    properties: {
      title: { type: "text" },
      director: { type: "text" },
      plot: { type: "text" },
    },
  },
};

export async function initMovieIndex(customIndex=null) {
  try {
    await createIndex(customIndex || MOVIES_INDEX_NAME, MOVIES_INDEX_SCHEMA);
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
}

export async function deleteMovieIndex(customIndex=null) {
  try {
    await deleteIndex(customIndex || MOVIES_INDEX_NAME);
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
}
