import { Document, Schema, Model, model} from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { UserSchema } from "../schemas/user.schema";

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);