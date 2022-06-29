"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AccountOwner_1 = __importDefault(require("../models/AccountOwner"));
const loginRouter = express_1.default.Router();
loginRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentAccountOwner = yield AccountOwner_1.default.find({
            email: req.body.email
        });
        if (!currentAccountOwner[0]) {
            return res.status(400).send({
                error: 'Account not found, please check your email address and try again'
            });
        }
        //await needed on the following line to return the populated validAccountOwner object
        const validAccountOwner = yield AccountOwner_1.default.login(req.body);
        if (validAccountOwner) {
            return res.send(validAccountOwner);
        }
        res.status(401).send({ error: 'Invalid credentials, please try again' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map