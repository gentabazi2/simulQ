import { CustomError } from './custom.error';

export class AuthError extends CustomError {
  statusCode = 401;

  serializeErrors() {
    return { message: 'Not authorized, please login again' };
  }

  constructor() {
    super('Authorization failure!');
  }
}
