"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectionString = process.env.MONGODB;

_mongoose["default"].connect(connectionString).then(function () {
  return console.log('Mongoose connected');
})["catch"](function (e) {
  return console.log(e);
});