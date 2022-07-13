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
const accountOwnerRouter = express_1.default.Router();
accountOwnerRouter
    //I think this endpoint does nothing and is a security concern
    .get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountOwner = yield AccountOwner_1.default.find(req.query);
        // accountOwner.populate()
        if (!accountOwner[0]) {
            return next({ status: 404, message: 'Account not found' });
        }
        else {
            res.send(accountOwner);
        }
    }
    catch (error) {
        next(error);
    }
}))
    //This endpoint creates new accountOwners
    .post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccountOwner = yield AccountOwner_1.default.signup(req.body);
        if (newAccountOwner) {
            return res.send(newAccountOwner);
        }
        res
            .status(400)
            .send({ error: 'Could not complete registration, please try again' });
    }
    catch (error) {
        next(error);
    }
}))
    //this creates a virtual credit card
    .patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { new: true, runValidators: true };
        const id = req.params.id;
        const updatedAccount = yield AccountOwner_1.default.findByIdAndUpdate(id, req.body, options);
        if (!updatedAccount) {
            return next({ status: 404, message: 'Account not found' });
        }
        res.send(updatedAccount);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = accountOwnerRouter;
//# sourceMappingURL=accountOwnerRouter.js.map