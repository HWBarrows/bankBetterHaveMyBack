"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const accountSchema = new Schema({
    accountOwner: {
        type: Schema.Types.ObjectId,
        ref: 'accountOwner',
        required: true
    },
    accountBalance: { type: Number, required: true, default: 0 },
    accountCurrency: { type: String, required: true },
    accountType: {
        type: String,
        enum: ['savings', 'checking'],
        required: true
    },
    accountActivity: { type: [Object] }
    // cardNumber: { type: String },
    // cardSecurityCode: { type: Number },
    // cardExpiry: { type: String }
}, { timestamps: true });
const Account = model('account', accountSchema);
exports.default = Account;
//# sourceMappingURL=Account.js.map