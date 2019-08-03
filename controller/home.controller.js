/* eslint-disable no-console */
const controller = {};

controller.home = (req, res) => {
  try {
    res.send('Home Page');
  } catch (e) {
    console.log(e);
  }
};

module.exports = controller;
