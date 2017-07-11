import { Document, Schema, Model, model} from "mongoose";

import { IPoll } from "../interfaces/poll.interface";
import { PollSchema } from "../schemas/poll.schema";

export interface IPollModel extends IPoll, Document {
  fullName(): string;
}

export const Poll: Model<IPollModel> = model<IPollModel>("Poll", PollSchema);