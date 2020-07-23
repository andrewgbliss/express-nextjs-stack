import express, { Request, Response } from 'express';
import { asyncEndpoint } from '../../../../../middleware';

const router = express.Router();

const getHealthcheck = (req: Request, res: Response) => {
  res.end();
};

const getError = (req: Request, res: Response) => {
  throw {
    status: 400,
    message: 'There was an error',
  };
};

router.get('/', getHealthcheck);
router.get('/error', asyncEndpoint(getError));

export default router;
