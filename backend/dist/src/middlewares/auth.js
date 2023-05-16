"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_then_1 = __importDefault(require("jwt-then"));
const index_1 = __importDefault(require("../configs/index"));
const auth_error_1 = require("../handlers/errors/auth.error");
exports.default = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.headers['x-access-token'])
                throw 'No authorization';
            let token = req.headers['x-access-token'];
            token = token.trim();
            const payload = yield jwt_then_1.default.verify(token, index_1.default.ACCESS_TOKEN_SECRET);
            req.payload = payload;
            next();
        }
        catch (err) {
            if (err === null || err === void 0 ? void 0 : err.expiredAt) {
                throw new Error('Session expired, please login again');
            }
            else
                throw new auth_error_1.AuthError();
        }
    });
};
