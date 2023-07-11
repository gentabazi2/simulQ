import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { CustomError } from "./custom.error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof mongoose.Error.CastError) {
    res.status(500).send({
      errors: { message: err.message },
    });
  } else if (err instanceof mongoose.Error.ValidationError) {
    //Handle Mongoose Validation Errors
    const errorKeys = Object.keys(err.errors);
    const errs: { message: string }[] = [];
    errorKeys.forEach((key) => errs.push({ message: err.errors[key].message }));
    res.status(400).send({
      errors: errs,
    });
  } else if (err instanceof CustomError) {
    //Handle Custom Errors
    res.status(err.statusCode).send({ error: err.serializeErrors() });
  } else {
    res.status(401).send({ error: err?.message || "Internal Server Error" });
  }
};
