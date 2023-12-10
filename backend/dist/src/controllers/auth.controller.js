"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.register = exports.resetPassword = exports.logOut = exports.sendResetCode = exports.login = exports.check = void 0;
const service = __importStar(require("../services/auth.service"));
const check = async (req, res, next) => {
    try {
        res.json({ checked: true });
    }
    catch (error) {
        next(error);
    }
};
exports.check = check;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await service.login({
            email: email === null || email === void 0 ? void 0 : email.toLowerCase(),
            password,
        });
        res.cookie("x-access-token", response.access_token, { httpOnly: true });
        res.cookie("x-refresh-token", response.refresh_token, { httpOnly: true });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const sendResetCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const response = await service.sendResetCode({
            email,
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.sendResetCode = sendResetCode;
const logOut = async (req, res, next) => {
    res.clearCookie("x-access-token");
    res.status(200).json({ message: "Success" });
};
exports.logOut = logOut;
const resetPassword = async (req, res, next) => {
    try {
        const { resetCode, email, new_password } = req.body;
        const response = await service.resetPassword({
            resetCode,
            email,
            new_password,
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const register = async (req, res, next) => {
    const { full_name, email, password, country } = req.body;
    try {
        const response = await service.register({
            full_name,
            email: email === null || email === void 0 ? void 0 : email.toLowerCase(),
            password,
            country,
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const changePassword = async (req, res, next) => {
    try {
        const { old_password, new_password } = req.body;
        const { _id } = req.payload;
        const response = await service.changePassword({
            user_id: _id,
            old_password,
            new_password,
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=auth.controller.js.map