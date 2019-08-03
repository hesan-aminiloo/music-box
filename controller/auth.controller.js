/* eslint-disable consistent-return */
// const mongoose = require('../bootstrap/db');
const jwt = require('jsonwebtoken');
const config = require('../config');
const validate = require('../Helpers/validator');
const User = require('../Models/User');
const { API } = require('../Helpers');


const controller = {};

controller.register = async (req, res) => {
  const { respond } = API;
  try {
    const newUser = await validate(req.body, 'register');
    try {
      const user = new User(newUser);
      const registeredUser = await user.save();
      res.json(respond(true, 'Register user successful!', registeredUser));
    } catch (e) {
      res.json(respond(false, 'Error registering user'));
    }
  } catch (e) {
    res.json(respond(false, 'Invalid user data'));
  }
};

controller.login = async (req, res) => {
  const { respond } = API;
  try {
    const loginData = await validate(req.body, 'login');
    try {
      const { email, password } = loginData;
      const user = await User.findOne({ email });
      user.comparePassword(password, (error, isMatch) => {
        if (error && !isMatch) {
          return res.json(respond(false, 'Invalid email or password!'));
        }
        const { name } = user;
        const payload = { name, email: user.email };
        const claims = {
          expiresIn: '6h',
          issuer: 'music-lovers',
          audience: 'music-lovers',
        };
        jwt.sign(payload, config.secretKey, claims, (err, token) => {
          if (err) throw new Error('Email or password is not correct!');
          res.json(respond(true, 'Login Successful!', token));
        });
      });
    } catch (e) {
      return res.json(respond(false, 'Invalid email or password!'));
    }
  } catch (e) {
    res.json(respond(false, 'Invalid login data!'));
  }
};

module.exports = controller;
