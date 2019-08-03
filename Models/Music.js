/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require('../bootstrap/db');

const { Schema } = mongoose;

const MusicSchema = new Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  cover: { type: String, required: false },
  album: { type: String, required: false },
  duration: { type: String, required: true },
}, {
  timestamps: true,
  collection: 'Musics',
});

MusicSchema.pre('save', function (next) {
  const music = this;
  const { duration } = this;
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  music.duration = `${minutes}:${seconds}`;
  next();
});

module.exports = mongoose.model('Music', MusicSchema);
