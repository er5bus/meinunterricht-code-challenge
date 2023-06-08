import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import {
  errorHandle,
  notFoundHandle,
} from './helpers';

import api from './api';

const rootApi = '/api/v1';

const app = express();

app.use(helmet());
app.use(cors());

app.use(compression());

app.use(morgan('combined', { stream: process.stdout }));


app.use(rootApi, api);

app.use(errorHandle);
app.use(notFoundHandle);

export default app;
