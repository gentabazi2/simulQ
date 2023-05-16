import { Request, Response } from 'express';
import { ModifiedExpressRequest } from '../declarations/auth';
import * as service from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await service.login({
    email: email?.toLowerCase(),
    password,
  });
  res.json(response);
};
export const sendResetCode = async (
  req: ModifiedExpressRequest,
  res: Response
) => {
  const { email } = req.body;
  const response = await service.sendResetCode({
    email,
  });
  res.json(response);
};
export const resetPassword = async (
  req: ModifiedExpressRequest,
  res: Response
) => {
  const { resetCode, email, new_password } = req.body;
  const response = await service.resetPassword({
    resetCode,
    email,
    new_password,
  });
  res.json(response);
};
export const register = async (req: Request, res: Response) => {
  const { full_name, email, password, country } = req.body;
  const response = await service.register({
    full_name,
    email: email?.toLowerCase(),
    password,
    country,
  });
  res.json(response);
};

export const changePassword = async (
  req: ModifiedExpressRequest,
  res: Response
) => {
  const { old_password, new_password } = req.body;
  const { _id } = req.payload;
  const response = await service.changePassword({
    user_id: _id,
    old_password,
    new_password,
  });
  res.json(response);
};
