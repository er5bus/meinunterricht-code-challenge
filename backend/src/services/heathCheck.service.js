import { checkElasticsearchHealth } from 'database';
import { moviesDataProvider } from 'data-providers'


export async function checkHealth() {
  return {
    moviesApiIsUp: await moviesDataProvider.checkMoviesApiHealth(),
    elasticsearchIsUp: await checkElasticsearchHealth()
  }
}
