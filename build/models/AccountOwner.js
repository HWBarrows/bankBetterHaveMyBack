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
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const crypto_1 = require("../lib/crypto");
const addressSchema = new Schema({
    street: { type: String, trim: true, required: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true, trim: true }
}, { _id: false });
const accountOwnerSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    primaryAddress: { type: addressSchema, required: true },
    password: { type: String, required: true, trim: true },
    accounts: { type: [Schema.Types.ObjectId], ref: 'account' }
}, { timestamps: true });
accountOwnerSchema.statics.signup = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPass = yield (0, crypto_1.hash)(data.password);
        data.password = hashedPass;
        return AccountOwner.create(data);
    });
};
accountOwnerSchema.statics.login = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const approvedUser = yield AccountOwner.findOne({ email: data.email });
        if (!approvedUser) {
            return false;
        }
        const success = yield (0, crypto_1.validHash)(data.password, approvedUser.password);
        return success ? approvedUser : false;
    });
};
const AccountOwner = model('accountOwner', accountOwnerSchema);
exports.default = AccountOwner;
//# sourceMappingURL=AccountOwner.js.map