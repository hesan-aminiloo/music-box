const homeRoutes = require('./home.route');
const authRoutes = require('./auth.route');
const musicRoutes = require('./music.route');

module.exports = (app) => {
  app.use('/', homeRoutes);
  app.use('/auth', authRoutes);
  app.use('/music', musicRoutes);
};
