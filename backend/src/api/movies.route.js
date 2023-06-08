import express from 'express';
import { movieService } from 'services';

const router = express.Router();

router.get('', async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10, keyword } = req.query;
    const movies = await movieService.getMoviesWithPagination(
      parseInt(page, 10),
      parseInt(pageSize, 10),
      keyword
    );

    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
});

export default router;
