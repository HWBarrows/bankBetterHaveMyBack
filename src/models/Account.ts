import mongoose from 'mongoose';

const { Schema, model } = mongoose;

interface IAccount {
  owner: string;
  accountBalance: number;
  accountCurrency: string;
  accountType: string;
  accountActivity: [string];
  creditCardNumber: string;
  cardSecurityCode: number;
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
    accountType: { type: String, enum: ['savings', 'checking', 'credit'] },
    accountActivity: { type: [Object] },
    creditCardNumber: { type: String },
    cardSecurityCode: { type: Number }
  },
  { timestamps: true }
);

const Account = model<IAccount>('account', accountSchema);

export default Account;
