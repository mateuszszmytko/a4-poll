"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.PollSchema = new mongoose_1.Schema({
    createdAt: Date,
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    votes: [{
            ip: String,
            answer_id: Number
        }]
});
exports.PollSchema.pre("save", function (next) {
    var now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.PollSchema.methods.fullName = function () {
    return "test";
};
//# sourceMappingURL=poll.schema.js.map