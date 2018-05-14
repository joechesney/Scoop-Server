"use strict";

const { Router } = require('express');
const indexRouter = Router();

indexRouter.use('/myfeed', require('./getFeedB'));
indexRouter.use('/mywatchlist', require('./getWatchlistB'));
indexRouter.use('/home', require('./getHomePage'));
indexRouter.use('/reverbDeals', require('./getReverbDeals'));
indexRouter.use('/scoopDeals', require('./getScoopDeals'));

module.exports = indexRouter;