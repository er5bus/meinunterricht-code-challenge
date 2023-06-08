#!/usr/bin/env node
import yargs from 'yargs';

import { movieService } from 'services';

yargs
  .command(
    'movies-data',
    'Load movies data into Elasticsearch',
    {},
    () => {
      movieService.addMoviesBulk();
    }
  )
  .demandCommand(1, 'You must provide a valid command.')
  .help().argv;
