import mongoose, { Model } from 'mongoose';
const { Schema, model } = mongoose;
import { hash, validHash } from '../lib/crypto';

interface IAccountOwner {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accounts: [
    {
      owner: string;
      accountBalance: number;
      accountType: string;
      accountActivity: [string];
    }
  ];
}
interface AccountOwnerModel extends Model<IAccountOwner> {
  signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): string;

  login(data: { email: string; password: string }): boolean;
}

const addressSchema = new Schema(
  {
    street: { type: String, trim: true, required: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const accountOwnerSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    primaryAddress: { type: addressSchema, required: true },
    password: { type: String, required: true, trim: true },
    accounts: { type: [Schema.Types.ObjectId], ref: 'account' }
  },
  { timestamps: true }
);

accountOwnerSchema.statics.signup = async function (data) {
  const hashedPass = await hash(data.password);
  data.password = hashedPass;
  return AccountOwner.create(data);
};

accountOwnerSchema.statics.login = async function (data) {
  const approvedUser = await AccountOwner.findOne({ email: data.email });
  if (!approvedUser) {
    return false;
  }
  const success = await validHash(data.password, approvedUser.password);
  return success ? approvedUser : false;
};

const AccountOwner = model<IAccountOwner, AccountOwnerModel>(
  'accountOwner',
  accountOwnerSchema
);

export default AccountOwner;
