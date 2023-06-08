import express from 'express';
import { heathCheckService } from 'services';

const router = express.Router();

router.get('', async (_, res, next) => {
  try {
    const heathCheck = await heathCheckService.checkHealth();

    res.status(200).json(heathCheck);
  } catch (error) {
    next(error);
  }
});

export default router;
