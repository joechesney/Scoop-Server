"use strict";

const { Router } = require('express');
const indexRouter = Router();

indexRouter.use('/myfeed', require('./getFeedB'));
indexRouter.use('/mywatchlist', require('./getWatchlistB'));

module.exports = indexRouter;