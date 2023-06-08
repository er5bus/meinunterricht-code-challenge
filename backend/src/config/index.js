import dotenv from 'dotenv'

dotenv.config()

export default {
  elasticsearch: {
    node: process.env.ELASTICSEARCH_NODE,
  },
  movieThridParty: {
    apiEndpoint: process.env.MOVIE_API_ENDPOINT,
    apiKey: process.env.MOVIE_API_KEY
  }
};
