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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const checkValidation_1 = __importDefault(require("../handlers/checkValidation"));
const controller = __importStar(require("../controllers/auth.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/check', (0, auth_1.default)(), controller.check);
router.post('/login', (0, express_validator_1.body)('email', 'Valid email is required').isEmail().notEmpty(), (0, express_validator_1.body)('password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }), checkValidation_1.default, controller.login);
router.post('/register', (0, express_validator_1.body)('password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }), (0, express_validator_1.body)('full_name', 'Full name is required').notEmpty(), (0, express_validator_1.body)('email', 'Valid email is required').isEmail().notEmpty(), checkValidation_1.default, controller.register);
router.post('/change_password', (0, express_validator_1.body)('old_password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }), (0, express_validator_1.body)('new_password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }), checkValidation_1.default, (0, auth_1.default)(), controller.changePassword);
router.post('/send_resetCode', (0, express_validator_1.body)('email', 'Enter valid Email').notEmpty(), 
// checkValidation,  
controller.sendResetCode);
router.post('/reset_password', (0, express_validator_1.body)('resetCode', 'Enter Reset Code Sent to your Email').notEmpty(), (0, express_validator_1.body)('email', 'Enter valid Email').notEmpty(), (0, express_validator_1.body)('new_password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }), 
// checkValidation,
controller.resetPassword);
router.post('/logout', controller.logOut);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map