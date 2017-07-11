import { Schema } from "mongoose";

export var PollSchema: Schema = new Schema({
	createdAt: Date,
	question: String,
	answers:[String],
	votes: [{
		ip:String,
		answers_id: Number
	}]

});

PollSchema.pre("save", function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

PollSchema.methods.fullName = function(): string {
  return "test";
};

