"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validation_error_1 = require("./errors/validation.error");
exports.default = (req, _res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        next(new validation_error_1.RequestValidationError(errors.array()));
    }
    else {
        next();
    }
};
//# sourceMappingURL=checkValidation.js.map