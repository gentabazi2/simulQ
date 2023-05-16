"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./src/configs/index"));
const http_1 = __importDefault(require("http"));
const socketIo = require("socket.io");
mongoose_1.default.connection.once('open', () => {
    console.log('MongoDB Connected.');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log('MongoDB Connection Error: ' + err.message);
});
mongoose_1.default.connect(index_1.default.DATABASE, {
    dbName: "simulQ"
});
require("./src/loaders/models");
const app_1 = __importDefault(require("./src/app"));
const server = http_1.default.createServer(app_1.default);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const getApiAndEmit = (socket) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};
io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        console.log("data", data.text);
        io.emit('messageResponse', data);
    });
    socket.on("disconnect", () => {
        console.log('🔥: A user disconnected');
    });
});
server.listen(index_1.default.PORT || 80, () => {
    console.log('Server Listening on: ' + index_1.default.PORT);
});
