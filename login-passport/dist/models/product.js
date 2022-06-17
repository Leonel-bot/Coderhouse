"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: String
}, {
  timestamps: true
});

var ProductModel = _mongoose["default"].model('Product', productSchema);

exports.ProductModel = ProductModel;