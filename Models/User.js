/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');
const mongoose = require('../bootstrap/db');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.ObjectId, ref: 'Music' }],
  playlist: [{ type: Schema.ObjectId, ref: 'Playlist' }],
}, {
  timestamps: true,
  collection: 'users',
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (error, hashedPass) {
        if (error) return next(err);
        user.password = hashedPass;
        return next();
      });
    });
  } else {
    next(new Error('User already exist!'));
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (!err && isMatch) return cb(null, isMatch);
    return cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
