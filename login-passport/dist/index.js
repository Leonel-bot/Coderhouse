"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.args = void 0;

var _server = _interopRequireDefault(require("./services/server"));

var _minimist = _interopRequireDefault(require("minimist"));

require("dotenv/config");

require("./services/socket");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import './services/mongo'
var optionalArgs = {
  alias: {
    p: 'port',
    c: 'cluster'
  },
  "default": {
    port: '8080',
    cluster: false
  }
};
/* process.on('exit', (code) => {
    console.log(`BeforeExist: El proceso termino con codigo ${code}`);
}) */

process.on('uncaughtException', function (err) {
  console.log("Uncaught Exception:  ".concat(err.message));
  process.exit(1);
}); //throw new Error('error node message')
//process.stdout.write('Mensaje desde la consola\n')

var args = (0, _minimist["default"])(process.argv, optionalArgs);
exports.args = args;
var PORT = args.port;

_server["default"].listen(PORT, function () {
  console.log("Server listen in port ".concat(PORT, " - PID: ").concat(process.pid));
});