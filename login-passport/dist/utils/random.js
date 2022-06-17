"use strict";

var randomNumber = function randomNumber() {
  var sum = 0;

  for (var i = 0; i < 6e9; i++) {
    sum += i;
  }

  return sum;
};

process.on('get_random', function (msg) {
  if (msg == 'start') {
    console.log("Start calculo in procces id ".concat(process.pid));
    process.send(10); //const sum = randomNumber()
    //process.send(sum)
  }
});