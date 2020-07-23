import express, { Request, Response, NextFunction } from 'express';
import { loggedInUser, asyncEndpoint, toJson } from '../../../../../middleware';

const router = express.Router();

const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.results = req.user;
  next();
};

const updateMe = async (req: Request, res: Response) => {
  const { Users, Accounts } = req.app.get('db');
  if (req.body.user) {
    await Users.update(req.body.user, {
      where: {
        id: req.user.id,
      },
      individualHooks: true,
    });
  }
  if (req.body.account) {
    await Accounts.update(req.body.account, {
      where: {
        id: req.user.account.id,
      },
      individualHooks: true,
    });
  }
  res.end();
};

router.get('/', loggedInUser, getMe, toJson);
router.put('/', asyncEndpoint(updateMe));

export default router;
