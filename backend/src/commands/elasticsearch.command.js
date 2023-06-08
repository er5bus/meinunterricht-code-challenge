#!/usr/bin/env node

import {initMovieIndex, deleteMovieIndex} from "database"


require("yargs")
  .command("create-db-index", "Create Elasticsearch index", {}, async () => {
    await initMovieIndex();
  })
  .command("delete-db-index", "Delete Elasticsearch index", {}, async () => {
    await deleteMovieIndex();
  })
  .demandCommand(1, "You must provide a valid command.")
  .help().argv;
