"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreOptions = void 0;

var _expressSession = _interopRequireDefault(require("express-session"));

var _sessionFileStore = _interopRequireDefault(require("session-file-store"));

require("dotenv/config");

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ttlSeconds = 180;
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: process.env.MONGODB,
    crypto: {
      secret: 'squirrel'
    }
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000
  }
};
exports.StoreOptions = StoreOptions;