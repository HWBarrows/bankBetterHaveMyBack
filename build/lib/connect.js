"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connect() {
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
    const connStr = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
    const { connection } = mongoose_1.default;
    connection.on('connecting', () => console.log('[M] connecting'));
    connection.on('connected', () => console.log('[M] connected'));
    connection.on('disconnecting', () => console.log('[M] disconnecting'));
    connection.on('disconnected', () => console.log('[M] disconnected'));
    connection.on('error', () => console.log('[M] error', Error));
    mongoose_1.default.connect(connStr);
}
exports.default = connect;
//# sourceMappingURL=connect.js.map