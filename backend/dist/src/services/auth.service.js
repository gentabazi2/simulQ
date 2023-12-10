"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.resetPassword = exports.sendResetCode = exports.register = exports.login = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../configs/index"));
const jwt_then_1 = __importDefault(require("jwt-then"));
const fieldError_error_1 = require("../handlers/errors/fieldError.error");
const js_sha256_1 = require("js-sha256");
const User = mongoose_1.default.model('User');
const getTokens = async (userData) => {
    const accessTokenData = Object.assign(Object.assign({}, userData), { iat: Date.now() });
    const refreshTokenData = {
        _id: userData === null || userData === void 0 ? void 0 : userData.id,
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    };
    const accesstoken = await jwt_then_1.default.sign(accessTokenData, index_1.default.ACCESS_TOKEN_SECRET);
    const refreshtoken = await jwt_then_1.default.sign(refreshTokenData, index_1.default.REFRESH_TOKEN_SECRET);
    return { accesstoken, refreshtoken };
};
// 4 digit random generate
// const getRandomNumber = () => 1000 + Math.floor(Math.random() * 9000);
const login = async (payload) => {
    let { email, password } = payload;
    const hashedPassword = (0, js_sha256_1.sha256)(`${index_1.default.LOGIN_HASH_SALT}${password}`);
    const user = await User.findOne({
        email,
        password: hashedPassword,
    });
    if (!user)
        throw new Error('Either email or password is invalid');
    const userDetails = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    const { accesstoken, refreshtoken } = await getTokens(userDetails);
    const user_obj = user.toJSON();
    user_obj === null || user_obj === void 0 ? true : delete user_obj.password;
    user_obj === null || user_obj === void 0 ? true : delete user_obj.__v;
    return {
        user: user_obj,
        access_token: accesstoken,
        refresh_token: refreshtoken,
    };
};
exports.login = login;
const register = async (payload) => {
    const { full_name, email, password } = payload;
    const isUser = await User.findOne({ email });
    if (isUser)
        throw new fieldError_error_1.FieldError('Email already registered');
    const newUser = new User({
        email,
        full_name,
        password: (0, js_sha256_1.sha256)(`${index_1.default.LOGIN_HASH_SALT}${password}`),
    });
    // await newUser.save();
    const userDetails = {
        _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
        email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
    };
    const { accesstoken, refreshtoken } = await getTokens(userDetails);
    const user_obj = newUser.toJSON();
    user_obj === null || user_obj === void 0 ? true : delete user_obj.password;
    user_obj === null || user_obj === void 0 ? true : delete user_obj.__v;
    await newUser.save();
    return {
        user: user_obj,
        access_token: accesstoken,
        refresh_token: refreshtoken,
        message: 'User registered successfully',
    };
};
exports.register = register;
const sendResetCode = async (payload) => {
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
        };
    }
    else {
        throw new Error('Email not Found');
    }
};
exports.sendResetCode = sendResetCode;
const resetPassword = async (payload) => {
    const { resetCode, email, new_password } = payload;
    const isUser = await User.findOne({
        email: email,
    });
    if (!isUser)
        throw new Error('User not Found');
    let currentResetCode = isUser.resetCode;
    if (resetCode === currentResetCode) {
        isUser.password = (0, js_sha256_1.sha256)(`${index_1.default.LOGIN_HASH_SALT}${new_password}`);
    }
    else {
        throw new Error('Reset code not valid');
    }
    await isUser.save();
    return {
        message: 'Reset Password Successfull',
    };
};
exports.resetPassword = resetPassword;
const changePassword = async (payload) => {
    const { user_id, old_password, new_password } = payload;
    const isUser = await User.findOne({
        _id: user_id,
        password: (0, js_sha256_1.sha256)(`${index_1.default.LOGIN_HASH_SALT}${old_password}`),
    });
    if (!isUser)
        throw new Error('Old password is not valid');
    isUser.password = (0, js_sha256_1.sha256)(`${index_1.default.LOGIN_HASH_SALT}${new_password}`);
    await isUser.save();
    return {
        message: 'Password changed successfully',
    };
};
exports.changePassword = changePassword;
//# sourceMappingURL=auth.service.js.map