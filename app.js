
const express = require('express');

const app = express();

require('./middlewares/appMiddleware')(app);

require('./bootstrap/db');

require('./routes')(app);

require('./Helpers/errorHandler')(app);

module.exports = app;
