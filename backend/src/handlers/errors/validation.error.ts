import { ValidationError } from 'express-validator';
import { CustomError } from './custom.error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters!');
  }

  serializeErrors() {
    let errObj: any = {};

    this.errors.forEach((error) => {
      errObj[error.param] = error.msg;
    });

    return { fields: errObj };
  }
}
