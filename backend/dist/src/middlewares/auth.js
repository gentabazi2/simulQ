"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_then_1 = __importDefault(require("jwt-then"));
const index_1 = __importDefault(require("../configs/index"));
const auth_error_1 = require("../handlers/errors/auth.error");
exports.default = () => {
    return async (req, res, next) => {
        try {
            if (!req.cookies['x-access-token'])
                throw new auth_error_1.AuthError();
            let token = req.cookies['x-access-token'];
            token = token.trim();
            const payload = await jwt_then_1.default.verify(token, index_1.default.ACCESS_TOKEN_SECRET);
            req.payload = payload;
            next();
        }
        catch (err) {
            if (err === null || err === void 0 ? void 0 : err.expiredAt) {
                throw new Error('Session expired, please login again');
            }
            next(err);
        }
    };
};
//# sourceMappingURL=auth.js.map