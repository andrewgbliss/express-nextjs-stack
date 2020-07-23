import express, { Request, Response, NextFunction } from 'express';
import {
  asyncEndpoint,
  toJson,
  validateSchema,
} from '../../../../../../middleware';
import joi from '@hapi/joi';

const router = express.Router();

const resetPasswordSchema = {
  path: 'body',
  schema: joi.object().keys({
    email: joi.string().required(),
  }),
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Users } = req.app.get('db');
  const email = req.app.get('email');
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    throw {
      status: 404,
      message: 'User not found',
    };
  }
  user.setResetPassword();
  await user.save();
  email.resetPassword(user.email, user.resetPasswordHash);
  req.results = {
    resetPasswordHash: user.resetPasswordHash,
  };
  next();
};

const verifyHashSchema = {
  path: 'params',
  schema: joi.object().keys({
    hash: joi.string().required(),
  }),
};

const verifyPasswordSchema = {
  path: 'body',
  schema: joi.object().keys({
    password: joi.string().required(),
  }),
};

const verifyHash = async (req: Request, res: Response) => {
  const { Users } = req.app.get('db');
  const user = await Users.findOne({
    where: {
      resetPasswordHash: req.params.hash,
    },
  });
  if (!user) {
    throw {
      status: 404,
      message: 'User not found',
    };
  }
  if (!user.hasValidResetPassword()) {
    throw {
      status: 400,
      message: 'Verification has timed out',
    };
  }
  user.unsetResetPassword();
  user.password = req.body.password;
  user.save();
  res.end();
};

router.put(
  '/',
  validateSchema(resetPasswordSchema),
  asyncEndpoint(resetPassword),
  toJson
);
router.put(
  '/verify/:hash',
  validateSchema(verifyHashSchema, verifyPasswordSchema),
  asyncEndpoint(verifyHash)
);

export default router;
