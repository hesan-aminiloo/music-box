const jwt = require('jsonwebtoken');
const config = require('../config');
const { API } = require('../Helpers');

const { respond } = API;

module.exports = (req, res, next) => {
  if (!req.headers.auth) {
    return res.status(401).json(respond(false, 'Unauthorized request'));
  }
  const token = req.headers.auth;
  jwt.verify(token, config.secretKey, (err, user) => {
    if (!err) {
      req.user = user;
      return next();
    }
    return res.status(401).json(respond(false, 'Unauthorized request'));
  });
};
