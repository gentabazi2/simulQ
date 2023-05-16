export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeErrors(): any;
  
    constructor(message: string) {
      super(message);
    }
  }
  