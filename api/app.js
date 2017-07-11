"use strict";
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
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var user_model_1 = require("./models/user.model");
var poll_router_1 = require("./routes/poll.router");
var mongoose = require("mongoose"); //import mongoose
// Creates and configures an ExpressJS web server.
var App = (function () {
    //Run configuration methods on the Express instance.
    function App() {
    }
    App.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.express = express();
                        return [4 /*yield*/, this.DBConnect()];
                    case 1:
                        _a.sent();
                        this.middleware();
                        this.routes();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.DBConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var MONGODB_CONNECTION, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MONGODB_CONNECTION = "mongodb://raa:randompass12@ds153682.mlab.com:53682/votes";
                        return [4 /*yield*/, mongoose.connect(MONGODB_CONNECTION)];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        var a = new user_model_1.User({ "email": "rak@02.pl", "firstName": "rak", "lastName": "rakk" });
        console.log(a.fullName());
        router.get('/', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var rak;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findOne()];
                    case 1:
                        rak = _a.sent();
                        res.json({
                            message: 'Hello World!',
                            data: rak,
                            data2: a
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        router.post('/', function (req, res, next) {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/polls', poll_router_1.PollRouter);
    };
    return App;
}());
var app = new App();
app.init();
exports.default = app.express;
//# sourceMappingURL=app.js.map