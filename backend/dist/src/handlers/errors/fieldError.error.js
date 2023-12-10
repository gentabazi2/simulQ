"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldError = void 0;
const custom_error_1 = require("./custom.error");
class FieldError extends custom_error_1.CustomError {
    serializeErrors() {
        return this.errObj;
    }
    constructor(err) {
        super(err);
        this.statusCode = 401;
        this.errObj = err;
    }
}
exports.FieldError = FieldError;
//# sourceMappingURL=fieldError.error.js.map