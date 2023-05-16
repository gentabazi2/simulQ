import mongoose from 'mongoose';
import config from '../configs/index';
import jwt from 'jwt-then';
import { FieldError } from '../handlers/errors/fieldError.error';
import { IUser } from '../models/user';
import { sha256 } from 'js-sha256';


const User = mongoose.model<IUser>('User');
const getTokens = async (userData: any) => {
  const accessTokenData = {
    ...userData,
    iat: Date.now(),
    // exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 min
  };

  const refreshTokenData = {
    _id: userData?.id,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };

  const accesstoken = await jwt.sign(
    accessTokenData,
    config.ACCESS_TOKEN_SECRET
  );
  const refreshtoken = await jwt.sign(
    refreshTokenData,
    config.REFRESH_TOKEN_SECRET
  );

  return { accesstoken, refreshtoken };
};

// 4 digit random generate
// const getRandomNumber = () => 1000 + Math.floor(Math.random() * 9000);

export const login = async (payload: any) => {
  let { email, password } = payload;
  const hashedPassword = sha256(`${config.LOGIN_HASH_SALT}${password}`);

  const user = await User.findOne({
    email,
    password: hashedPassword,
  });

  if (!user) throw new Error('Either email or password is invalid');

  const userDetails = {
    _id: user?._id,
    email: user?.email,
  };

  const { accesstoken, refreshtoken } = await getTokens(
    userDetails
  );

  const user_obj: any = user.toJSON();
  delete user_obj?.password;
  delete user_obj?.__v;
  return {
    user: user_obj,
    access_token: accesstoken,
    refresh_token: refreshtoken,
  };
};

export const register = async (payload: any) => {
  const { full_name, email, password } = payload;

  const isUser = await User.findOne({ email });
  if (isUser) throw new FieldError({ email: 'Email already registered' });

  const newUser = new User({
    email,
    full_name,
    password: sha256(`${config.LOGIN_HASH_SALT}${password}`),
  });

  // await newUser.save();

  const userDetails = {
    _id: newUser?._id,
    email: newUser?.email,
  };

  const { accesstoken, refreshtoken } = await getTokens(userDetails);

  const user_obj: any = newUser.toJSON();
  delete user_obj?.password;
  delete user_obj?.__v;
    await newUser.save();
    return {
      user: user_obj,
      access_token: accesstoken,
      refresh_token: refreshtoken,
      message: 'User registered successfully',
    };
};
export const sendResetCode = async (payload: any) => {
  const { email } = payload;
  const isUser = await User.findOne({
    email: email,
  });
  if (isUser) {
    let currentResetCode = Math.floor(Math.random() * 99999) + 10000;
    isUser.resetCode = String(currentResetCode);
    await isUser.save();
    return {
        resetCode: currentResetCode
    }
  } else {
    throw new Error('Email not Found');
  }
};
export const resetPassword = async (payload: any) => {
  const { resetCode, email, new_password } = payload;
  const isUser = await User.findOne({
    email: email,
  });
  if (!isUser) throw new Error('User not Found');
  let currentResetCode = isUser.resetCode;

  if (resetCode === currentResetCode) {
    isUser.password = sha256(`${config.LOGIN_HASH_SALT}${new_password}`);
  } else {
    throw new Error('Reset code not valid');
  }
  await isUser.save();
  return {
    message: 'Reset Password Successfull',
  };
};
export const changePassword = async (payload: any) => {
  const { user_id, old_password, new_password } = payload;

  const isUser = await User.findOne({
    _id: user_id,
    password: sha256(`${config.LOGIN_HASH_SALT}${old_password}`),
  });

  if (!isUser) throw new Error('Old password is not valid');

  isUser.password = sha256(`${config.LOGIN_HASH_SALT}${new_password}`);
  await isUser.save();
  return {
    message: 'Password changed successfully',
  };
};
