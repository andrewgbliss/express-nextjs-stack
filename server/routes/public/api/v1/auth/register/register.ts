import express, { Request, Response, NextFunction } from 'express';
import {
  asyncEndpoint,
  toJson,
  validateSchema,
} from '../../../../../../middleware';
import joi from '@hapi/joi';

const router = express.Router();

const registerSchema = {
  path: 'body',
  schema: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { Users, Accounts } = req.app.get('db');
  const email = req.app.get('email');
  const existingUser = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (existingUser) {
    throw {
      status: 400,
      message: `${req.body.email} already exists`,
    };
  }
  const account = await Accounts.create();
  const data = { accountId: account.id, ...req.body };
  const user = await Users.create(data);
  email.register(user.email, user.verificationHash);
  req.results = { id: user.id };
  next();
};

const completeRegistrationSchema = {
  path: 'params',
  schema: joi.object().keys({
    verificationHash: joi.string().required(),
  }),
};

const completeRegistration = async (req: Request, res: Response) => {
  const { Users } = req.app.get('db');
  const { verificationHash } = req.params;
  const user = await Users.findOne({
    where: {
      verificationHash,
    },
  });
  if (!user) {
    throw {
      status: 404,
      message: `Verification code has either expired or you have entered it incorrectly`,
    };
  }
  await user.update({
    verified: true,
    verificationHash: null,
  });
  req.refreshJWT(user.id, user.accountId);
  res.end();
};

router.post(
  '/',
  validateSchema(registerSchema),
  asyncEndpoint(register),
  toJson
);
router.get(
  '/complete/:verificationHash',
  validateSchema(completeRegistrationSchema),
  asyncEndpoint(completeRegistration)
);

export default router;
