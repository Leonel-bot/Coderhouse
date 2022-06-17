"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _product = _interopRequireDefault(require("./product"));

var _random = _interopRequireDefault(require("./random"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/productos-test', _product["default"]);
router.use('/random', _random["default"]);
var _default = router;
exports["default"] = _default;