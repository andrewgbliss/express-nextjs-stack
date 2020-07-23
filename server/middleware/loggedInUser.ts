import { Request, Response, NextFunction } from 'express';

const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Users, Accounts } = req.app.get('db');
  req.user = await Users.findByPk(req.user.id, {
    attributes: ['id', 'email', 'accountId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Accounts,
        as: 'account',
      },
    ],
  });
  next();
};

export default loggedInUser;
