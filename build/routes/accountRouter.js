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
const AccountOwner_1 = __importDefault(require("../models/AccountOwner"));
const accountRouter = express_1.default.Router();
accountRouter
    //this populates the info in the home page for the onClick function
    .get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield Account_1.default.findById(req.params.id);
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
    //this post request creates a new account
    .post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountOwner = yield AccountOwner_1.default.findById(req.body.accountOwner);
        if (!accountOwner) {
            return next({ status: 401, message: 'Account owner not found' });
        }
        else if (accountOwner.accounts.length > 4) {
            return next({
                status: 406,
                message: 'Too many accounts, unable to add more'
            });
        }
        const newAccount = yield Account_1.default.create(req.body);
        if (newAccount && accountOwner.accounts.length < 5) {
            //@ts-ignore
            accountOwner.accounts.push(newAccount);
            yield accountOwner.save();
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
    //this put records financial transactions made with specified account id or credit card number
    .put('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { new: true, runValidators: true };
    const filter = req.body.identifier;
    const update = {
        accountBalance: req.body.accountBalance,
        accountActivity: req.body.accountActivity
    };
    try {
        const account = yield Account_1.default.findOneAndUpdate(req.body.identifier, update, { new: true });
        res.send(account);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = accountRouter;
//# sourceMappingURL=accountRouter.js.map