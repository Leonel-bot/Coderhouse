"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var chatSchema = new Schema({
  author: {
    email: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var ChatModel = _mongoose["default"].model('Chat', chatSchema);

exports.ChatModel = ChatModel;