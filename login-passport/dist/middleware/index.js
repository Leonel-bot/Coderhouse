"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;

var authMiddleware = function authMiddleware(req, res, next) {
  var passport = req.session.passport;
  if (passport !== null && passport !== void 0 && passport.user) next();else res.redirect('/login');
};

exports.authMiddleware = authMiddleware;