import express, { Request, Response } from 'express';

const router = express.Router();

const logout = (req: Request, res: Response) => {
  res.set('JWT_TOKEN', '');
  res.clearCookie('token');
  res.end();
};

router.post('/', logout);

export default router;
