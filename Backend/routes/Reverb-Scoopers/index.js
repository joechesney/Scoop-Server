"use strict";

const { Router } = require('express');
const indexRouter = Router();

indexRouter.use('/myfeed', require('./getFeed'));
indexRouter.use('/mywatchlist', require('./getWatchlist'));

module.exports = indexRouter;