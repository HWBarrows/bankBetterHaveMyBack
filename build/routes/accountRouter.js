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
const Account_1 = __importDefault(require("../models/Account"));
const accountRouter = express_1.default.Router();
accountRouter
    .get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield Account_1.default.find(req.query);
        if (!accounts) {
            return next({ status: 404, message: 'No accounts found' });
        }
        else {
            res.send(accounts);
        }
    }
    catch (error) {
        next(error);
    }
}))
    .post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccount = yield Account_1.default.create(req.body);
        if (newAccount) {
            return res.send(newAccount);
        }
        res
            .status(400)
            .send({ error: 'Could not complete registration, please try again' });
    }
    catch (error) {
        next(error);
    }
}))
    .patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { new: true, runValidators: true };
        const id = req.params.id;
        const updatedAccount = yield Account_1.default.findByIdAndUpdate(id, req.body, options);
        if (!updatedAccount) {
            return next({ status: 404, message: 'Account not found' });
        }
        res.send(updatedAccount);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = accountRouter;
//# sourceMappingURL=accountRouter.js.map