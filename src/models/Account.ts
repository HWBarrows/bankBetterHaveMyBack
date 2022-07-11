import mongoose from 'mongoose';

const { Schema, model } = mongoose;

interface IAccount {
  owner: string;
  accountBalance: number;
  accountCurrency: string;
  accountType: string;
  accountActivity: [string];
}

const accountSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Account = model<IAccount>('account', accountSchema);

export default Account;
