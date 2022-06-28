import mongoose, { Model, SchemaTypes } from 'mongoose';
const { Schema, model } = mongoose;
import { hash, validHash } from '../lib/crypto';

interface IAccountOwner {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accounts: string;
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

const accountOwnerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
