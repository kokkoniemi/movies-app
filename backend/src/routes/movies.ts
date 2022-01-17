import express, { Request, Response, NextFunction } from 'express';
import { getRepository, ILike } from 'typeorm';
import { logger } from '../utils/logs';
import { Movie } from '../models/movie';
import { validateCreateRequest, validateListingRequest } from '../validators/movies';

const router = express.Router();

/**
 * Fetch a list of all movies
 */
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = await validateListingRequest(req.query);
    const pageLengt = 5;
    const offset = typeof query.offset === 'undefined'
      ? 0 : parseInt(query.offset as string, 10);
    const limit = typeof query.limit === 'undefined'
      ? pageLengt : parseInt(query.limit as string, 10);
    const q = query.q || null;

    const count = await getRepository(Movie).count();
    const movies = await getRepository(Movie).find({
      skip: offset,
      take: limit,
      relations: ['director', 'actors', 'genres'],
      ...(q ? { // search functionalities
        where: [
          { name: ILike(`%${q}%`) },
          { synopsis: ILike(`%${q}%`) }
        ],
      } : {})
    });

    res.send({
      count,
      results: movies,
      next: offset + limit >= count
        ? null
        : `${req.protocol}://${req.get('Host')}${req.baseUrl + req.path}?offset=${offset + pageLengt}&limit=${limit}`,
    });
  } catch (e) {
    next(e);
    logger.error(e);
  }
});

/**
 * Create a new movie
 */
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = await validateCreateRequest(req.body);
    const movie = new Movie();

    const keys = Object.keys(validatedData);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      movie[key] = validatedData[key];
    }
    const result = await getRepository(Movie).save(movie);
    res.status(201);
    res.send(result);
  } catch (e) {
    next(e);
    logger.error(e);
  }
});

/**
 * Delete a movie
 */
router.delete(`/:movieId`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await getRepository(Movie).delete(req.params.movieId);
    res.sendStatus(204);
  } catch (e) {
    next(e);
    logger.error(e);
  }
});

export default router;
