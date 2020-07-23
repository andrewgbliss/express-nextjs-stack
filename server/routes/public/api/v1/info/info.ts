import express, { Request, Response, NextFunction } from 'express';
import { toJson } from '../../../../../middleware';

const router = express.Router();

const getInfo = (req: Request, res: Response, next: NextFunction) => {
  req.results = {
    env: process.env.NODE_ENV,
    hostname: require('os').hostname(),
    timestamp: new Date().toISOString(),
  };
  next();
};

router.get('/', getInfo, toJson);

export default router;
