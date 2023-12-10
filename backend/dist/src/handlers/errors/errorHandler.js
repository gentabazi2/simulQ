"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const custom_error_1 = require("./custom.error");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof mongoose_1.default.Error.CastError) {
        res.status(500).send({
            errors: { message: err.message },
        });
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        //Handle Mongoose Validation Errors
        const errorKeys = Object.keys(err.errors);
        const errs = [];
        errorKeys.forEach((key) => errs.push({ message: err.errors[key].message }));
        res.status(400).send({
            errors: errs,
        });
    }
    else if (err instanceof custom_error_1.CustomError) {
        //Handle Custom Errors
        res.status(err.statusCode).send({ error: err.serializeErrors() });
    }
    else {
        res.status(401).send({ error: (err === null || err === void 0 ? void 0 : err.message) || "Internal Server Error" });
    }
    _next();
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map