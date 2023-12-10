import { NextFunction, Request, Response } from "express";
import { ModifiedExpressRequest } from "../declarations/auth";
import * as service from "../services/auth.service";

export const check = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ checked: true });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const response = await service.login({
      email: email?.toLowerCase(),
      password,
    });
    res.cookie("x-access-token", response.access_token, { httpOnly: true });
    res.cookie("x-refresh-token", response.refresh_token, { httpOnly: true });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const sendResetCode = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const response = await service.sendResetCode({
      email,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("x-access-token");
  res.status(200).json({ message: "Success" });
};

export const resetPassword = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resetCode, email, new_password } = req.body;
    const response = await service.resetPassword({
      resetCode,
      email,
      new_password,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { full_name, email, password, country } = req.body;
  try {
    const response = await service.register({
      full_name,
      email: email?.toLowerCase(),
      password,
      country,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { old_password, new_password } = req.body;
    const { _id } = req.payload;
    const response = await service.changePassword({
      user_id: _id,
      old_password,
      new_password,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
