"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const accountSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'accountOwner',
        required: true
    },
    accountBalance: { type: Number, required: true, default: 0 },
    accountType: { type: String, enum: ['savings', 'checking', 'credit'] },
    accountActivity: { type: [String] }
}, { timestamps: true });
const Account = model('account', accountSchema);
exports.default = Account;
//# sourceMappingURL=Account.js.map