import { Router } from 'express';
import movies from './movies.route';
import healthCheck from './healthCheck.route';

const router = new Router();

router.use('/movies', movies);
router.use('/health-check', healthCheck)

export default router;
