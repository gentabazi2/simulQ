"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const document_routes_1 = __importDefault(require("../routes/document.routes"));
const app = (0, express_1.Router)();
exports.default = () => {
    app.use("/v1/auth", auth_routes_1.default);
    app.use("/v1/document", document_routes_1.default);
    return app;
};
//# sourceMappingURL=routes.js.map