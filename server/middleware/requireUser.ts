import { Request, Response, NextFunction } from 'express';
import asyncEndpoint from './asyncEndpoint';

export const requireUser = () => {
  return asyncEndpoint(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        throw {
          status: 401,
          message: 'Invalid authentication',
        };
      }
      next();
    }
  );
};
