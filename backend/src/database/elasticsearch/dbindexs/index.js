import client from '../client';

export * from './movie.dbindex';

export async function indexExists(index) {
  return await client.indices.exists({ index });
}

export async function createIndex(index, body) {
  const exists = await indexExists(index);

  if (!exists) {
    await client.indices.create({
      index,
      body,
    });
    console.log(`Index "${index}" created successfully.`);
  } else {
    console.log(`Index "${index}" already exists.`);
  }
}

export async function deleteIndex(index) {
  const exists = await indexExists(index);

  if (exists) {
    const response = await client.indices.delete({
      index: [index],
    });

    if (response && response.acknowledged) {
      console.log(`Index "${index}" deleted successfully.`);
    } else {
      console.error(`Failed to delete Index "${index}"`);
    }
  } else {
    console.log(`Index "${index}" does not exists.`);
  }
}
