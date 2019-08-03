const { API } = require('../Helpers');
const validate = require('../Helpers/validator');
const Music = require('../Models/Music');
const User = require('../Models/User');

const { respond } = API;
const controller = {};

controller.list = async (req, res) => {
  try {
    const musics = await Music.find({});
    res.json(respond(true, 'List music successful', musics));
  } catch (e) {
    res.json(respond(false, 'Failed to list musics'));
  }
};

controller.item = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findById(id);
    res.json(respond(true, 'Music is here!', music));
  } catch (e) {
    res.json(respond(false, 'Couldn\'t find the music you want'));
  }
};

controller.new = async (req, res) => {
  try {
    const musicData = await validate(req.body, 'newMusic');
    try {
      const music = new Music(musicData);
      const savedMusic = await music.save();
      res.json(respond(true, 'Music saved successfuly!', savedMusic));
    } catch (e) {
      res.json(respond(false, 'Unable to save this music'));
    }
  } catch (e) {
    res.json(respond(false, 'Invalid music data!'));
  }
};

controller.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByIdAndDelete(id);
    res.json(respond(true, 'Music has gone!', music));
  } catch (e) {
    res.json(respond(false, 'Couldn\'t find the music you want'));
  }
};

controller.edit = async (req, res) => {
  try {
    const musicData = await validate(req.body, 'editMusic');
    try {
      const { id } = req.params;
      const music = await Music.findById(id);
      Object.keys(musicData).forEach((value) => {
        music[value] = musicData[value];
      });
      const editedMusic = await music.save();
      res.json(respond(true, 'Music edited', editedMusic));
    } catch (e) {
      res.json(respond(false, 'Cant edit the music!'));
    }
  } catch (e) {
    res.json(respond(false, 'Invalid music data!'));
  }
};

controller.favorite = async (req, res) => {
  try {
    const { musicId } = req.params;
    const { email } = req.user;
    const updatedUser = await User.update({ email }, { $addToSet: { favorites: musicId } });
    res.json(updatedUser);
  } catch (e) {
    res.json(respond(false, 'Invalid data'));
  }
};

module.exports = controller;
