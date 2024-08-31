import { Request, Response, NextFunction } from 'express';

import { verifyJWT } from '../helper/jwt';
import { NotAuthorizedError } from '../helper/custom_error';

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new NotAuthorizedError();
    }

    const token = authorizationHeader.split(' ')[1];
    const decoded = await verifyJWT(token);
    res.locals.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
