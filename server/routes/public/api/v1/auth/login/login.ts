import express, { Request, Response, NextFunction } from 'express';
import { asyncEndpoint, validateSchema } from '../../../../../../middleware';
import joi from '@hapi/joi';

const router = express.Router();

const loginSchema = {
  path: 'body',
  schema: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { Users } = req.app.get('db');
  const user = await Users.findOne({
    attributes: ['id', 'accountId', 'email', 'password'],
    where: {
      email: req.body.email,
    },
  });
  if (!user || !user.verifyPassword(req.body.password)) {
    throw {
      status: 403,
      message: 'Email or Password is incorrect',
    };
  }
  req.refreshJWT(user.id, user.accountId);
  res.end();
};

router.post('/', validateSchema(loginSchema), asyncEndpoint(login));

export default router;
