import { CustomError } from './custom.error';

export class FieldError extends CustomError {
  statusCode = 401;
  errObj: any;

  serializeErrors() {
    console.log("error", this.errObj);
    return  this.errObj ;
  }

  constructor(err: any) {
    super(err);
    this.errObj = err;
    console.log("error", this.errObj);
  }
}
