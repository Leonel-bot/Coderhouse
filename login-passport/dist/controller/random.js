"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandom = exports.getNotBlocker = exports.getBlocker = void 0;

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _calculo = require("../utils/calculo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getBlocker = function getBlocker(req, res) {
  var result = (0, _calculo.calculo)();
  res.json({
    result: result
  });
};

exports.getBlocker = getBlocker;

var scriptPath = _path["default"].resolve(__dirname, '../utils/calculo.js');

var getNotBlocker = function getNotBlocker(req, res) {
  var computo = (0, _child_process.fork)(scriptPath);
  computo.send('start');
  computo.on('message', function (sum) {
    res.json({
      result: sum
    });
  });
};

exports.getNotBlocker = getNotBlocker;

var scriptPathRandom = _path["default"].resolve(__dirname, '../utils/random.js');

var getRandom = function getRandom(req, res) {
  var computo = (0, _child_process.fork)(scriptPathRandom);
  computo.send('start');
  computo.on('get_random', function (sum) {
    res.json({
      result: sum
    });
  });
};

exports.getRandom = getRandom;