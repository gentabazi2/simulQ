import { Request } from 'express';

export interface ModifiedExpressRequest extends Request {
  payload?: any;
}
