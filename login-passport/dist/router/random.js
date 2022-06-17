"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _random = require("../controller/random");

var router = (0, _express.Router)();
router.get('/', _random.getRandom); //router.get('/calculo', getNotBlocker)
//router.get('/blocker', getBlocker)

var _default = router;
exports["default"] = _default;