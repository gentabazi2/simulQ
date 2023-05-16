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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.register = exports.resetPassword = exports.sendResetCode = exports.login = void 0;
const service = __importStar(require("../services/auth.service"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const response = yield service.login({
        email: email === null || email === void 0 ? void 0 : email.toLowerCase(),
        password,
    });
    res.json(response);
});
exports.login = login;
const sendResetCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const response = yield service.sendResetCode({
        email,
    });
    res.json(response);
});
exports.sendResetCode = sendResetCode;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetCode, email, new_password } = req.body;
    const response = yield service.resetPassword({
        resetCode,
        email,
        new_password,
    });
    res.json(response);
});
exports.resetPassword = resetPassword;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, email, password, country } = req.body;
    const response = yield service.register({
        full_name,
        email: email === null || email === void 0 ? void 0 : email.toLowerCase(),
        password,
        country,
    });
    res.json(response);
});
exports.register = register;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { old_password, new_password } = req.body;
    const { _id } = req.payload;
    const response = yield service.changePassword({
        user_id: _id,
        old_password,
        new_password,
    });
    res.json(response);
});
exports.changePassword = changePassword;
