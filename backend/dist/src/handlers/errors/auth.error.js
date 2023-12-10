"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const custom_error_1 = require("./custom.error");
class AuthError extends custom_error_1.CustomError {
    serializeErrors() {
        return { message: 'Not authorized, please login again' };
    }
    constructor() {
        super('Authorization failure!');
        this.statusCode = 401;
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=auth.error.js.map