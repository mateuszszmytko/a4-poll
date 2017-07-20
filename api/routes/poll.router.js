"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _router_handler_1 = require("./_router.handler");
var poll_model_1 = require("../models/poll.model");
var PollRouterHandler = (function (_super) {
    __extends(PollRouterHandler, _super);
    function PollRouterHandler() {
        return _super.call(this) || this;
    }
    /**
     * Routes
     */
    PollRouterHandler.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var polls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, poll_model_1.Poll.find()];
                    case 1:
                        polls = _a.sent();
                        res.status(200).send({
                            message: 'Success',
                            status: res.status,
                            polls: polls
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PollRouterHandler.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, poll, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, poll_model_1.Poll.findById(id)];
                    case 2:
                        poll = _a.sent();
                        res.status(200)
                            .send({
                            message: 'Success',
                            poll: poll
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        res.status(404)
                            .send({
                            message: 'No hero found with the given id.',
                            status: res.status
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PollRouterHandler.prototype.postPoll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var pollRq, poll, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pollRq = req.body, poll = new poll_model_1.Poll({ question: pollRq.question, answers: pollRq.answers });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, poll.save()];
                    case 2:
                        _a.sent();
                        res.status(200)
                            .send({
                            message: 'Poll created.',
                            poll: poll,
                            status: res.status
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        res.status(400)
                            .send({
                            message: 'Bad request.',
                            status: res.status
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PollRouterHandler.prototype.addVote = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, answer_id, ip, poll_id, poll, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, answer_id = _a.answer_id, ip = _a.ip, poll_id = req.params.id;
                        return [4 /*yield*/, poll_model_1.Poll.findById(poll_id)];
                    case 1:
                        poll = _b.sent();
                        console.log(answer_id, ip);
                        if (!poll) return [3 /*break*/, 6];
                        if (poll.votes.filter(function (v) { return v.ip == ip; }).length > 0) {
                            res.status(400)
                                .send({
                                message: 'Ip declared.',
                                status: res.status
                            });
                            return [2 /*return*/];
                        }
                        poll.votes.push({ ip: ip, answer_id: answer_id });
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, poll.save()];
                    case 3:
                        _b.sent();
                        res.status(200)
                            .send({
                            message: 'Poll changed.',
                            poll: poll,
                            status: res.status
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _b.sent();
                        res.status(400)
                            .send({
                            message: 'Bad request.',
                            status: res.status
                        });
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.status(404)
                            .send({
                            message: 'Invalid poll id.',
                            status: res.status
                        });
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PollRouterHandler.prototype.removePoll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var poll_id, poll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        poll_id = req.params.id, poll = poll_model_1.Poll.findById(poll_id);
                        if (!poll) return [3 /*break*/, 2];
                        return [4 /*yield*/, poll.remove()];
                    case 1:
                        _a.sent();
                        res.status(200)
                            .send({
                            message: 'Poll deleted.',
                            status: res.status
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(404)
                            .send({
                            message: 'Invalid poll id.',
                            status: res.status
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PollRouterHandler.prototype.init = function () {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.put('/:id', this.addVote);
        this.router.delete('/:id', this.removePoll);
        this.router.post('/', this.postPoll);
    };
    return PollRouterHandler;
}(_router_handler_1.RouterHandler));
var routerHandler = new PollRouterHandler();
exports.PollRouter = routerHandler.router;
//# sourceMappingURL=poll.router.js.map