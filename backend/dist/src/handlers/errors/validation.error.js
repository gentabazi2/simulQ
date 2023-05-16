"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom.error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters!');
        this.errors = errors;
        this.statusCode = 400;
    }
    serializeErrors() {
        let errObj = {};
        this.errors.forEach((error) => {
            errObj[error.param] = error.msg;
        });
        return { fields: errObj };
    }
}
exports.RequestValidationError = RequestValidationError;
