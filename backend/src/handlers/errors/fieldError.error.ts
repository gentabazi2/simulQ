import { CustomError } from './custom.error';

export class FieldError extends CustomError {
  statusCode = 401;
  errObj: any;

  serializeErrors() {
    return { fields: this.errObj };
  }

  constructor(err: any) {
    super(err);
    this.errObj = err;
  }
}
