import mongoose from 'mongoose';

const { Schema, model } = mongoose;

interface IAccount {
  owner: string;
  accountBalance: number;
  accountType: string;
  accountActivity: [string];
  creditCardNumber: string;
  cardSecurityCode: number;
}

const accountSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'accountOwner',
      required: true
    },
    accountBalance: { type: Number, required: true, default: 0 },
    accountType: { type: String, enum: ['savings', 'checking', 'credit'] },
    accountActivity: { type: [String] },
    creditCardNumber: { type: String },
    cardSecurityCode: { type: Number }
  },
  { timestamps: true }
);

const Account = model<IAccount>('account', accountSchema);

export default Account;
