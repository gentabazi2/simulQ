import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from './errors/validation.error';

export default (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new RequestValidationError(errors.array()));
  } else {
    next();
  }
};
