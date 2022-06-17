"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculo = void 0;

var calculo = function calculo() {
  var sum = 0;

  for (var i = 0; i < 6e9; i++) {
    sum += i;
  }

  return sum;
};

exports.calculo = calculo;
process.on('message', function (msg) {
  if (msg == 'start') {
    console.log("Start calculo in procces id ".concat(process.pid));
    var sum = calculo();
    process.send(sum);
  }
});