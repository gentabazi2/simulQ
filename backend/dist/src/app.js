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
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./loaders/routes"));
const configs_1 = __importDefault(require("./configs"));
const errorHandler_1 = require("./handlers/errors/errorHandler");
const method_override_1 = __importDefault(require("method-override"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, express_1.json)({ limit: "25mb" }));
app.use((0, express_1.urlencoded)({ extended: true, limit: "25mb" }));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
//Allow CORS
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
app.use(configs_1.default.ENDPOINT_PREFIX, (0, routes_1.default)());
app.use((0, method_override_1.default)());
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map