import { NextFunction, Request, Response } from 'express';
import jwt from 'jwt-then';
import config from '../configs/index';
import { AuthError } from '../handlers/errors/auth.error';


export default () => {
  return async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      if (!req.headers['x-access-token']) throw 'No authorization';
      let token = req.headers['x-access-token'];
      token = token.trim();
      const payload: any = await jwt.verify(token, config.ACCESS_TOKEN_SECRET);
      req.payload = payload;
      next();
    } catch (err: any) {
      if (err?.expiredAt) {
        throw new Error('Session expired, please login again');
      } else throw new AuthError();
    }
  };
};
