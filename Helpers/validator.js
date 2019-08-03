/* eslint-disable no-undef */
const Joi = require('@hapi/joi');

const registerSchema = Joi.object().keys({
  password: Joi.string().required(),
  name: Joi.string().alphanum(),
  email: Joi.string().required(),
}).with('username', 'password');

const loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

const newMusicSchema = Joi.object().keys({
  name: Joi.string().required(),
  artist: Joi.string().required(),
  cover: Joi.string().required(),
  duration: Joi.number().required(),
  album: Joi.string(),
});

const editMusicSchema = Joi.object().keys({
  name: Joi.string(),
  artist: Joi.string(),
  cover: Joi.string(),
  duration: Joi.number(),
  album: Joi.string(),
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
  newMusic: newMusicSchema,
  editMusic: editMusicSchema,
};

const validator = (data, schema) => new Promise((resolve, reject) => {
  const { error, value } = Joi.validate(data, schemas[schema]);
  if (!error) {
    resolve(value);
  } else {
    reject(error);
  }
});


module.exports = validator;
