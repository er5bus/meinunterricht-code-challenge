import { Client } from '@elastic/elasticsearch';
import config from 'config';

const client = new Client({ node: config.elasticsearch.node });

export async function checkElasticsearchHealth() {
  try {
    const esHealthResponse = await client.cluster.health();
    const { status } = esHealthResponse
    return status === 'green' || status === 'yellow';
  } catch (error) {
    return false;
  }
}

export default client;

