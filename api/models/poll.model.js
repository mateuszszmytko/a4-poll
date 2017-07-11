"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var poll_schema_1 = require("../schemas/poll.schema");
exports.Poll = mongoose_1.model("Poll", poll_schema_1.PollSchema);
//# sourceMappingURL=poll.model.js.map