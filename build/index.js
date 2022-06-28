"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./lib/connect"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const accountOwnerRouter_1 = __importDefault(require("./routes/accountOwnerRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, connect_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/accountOwner', accountOwnerRouter_1.default);
app.use('/login', loginRouter_1.default);
app.use(globalErrorHandler_1.default);
const port = process.env.PORT;
app.get('/', (req, res) => res.send('Hi Everybody!'));
app.listen(port, () => console.log(`Serving fun at http://localhost:${port}`));
//# sourceMappingURL=index.js.map