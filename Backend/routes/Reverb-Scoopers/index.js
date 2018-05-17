"use strict";

const { Router } = require('express');
const indexRouter = Router();

indexRouter.use('/myFeed', require('./getFeedB'));
indexRouter.use('/myWatchlist', require('./getWatchlistB'));
indexRouter.use('/homePage', require('./getHomePage'));
indexRouter.use('/reverbDeals', require('./getReverbDeals'));
indexRouter.use('/scoopDeals', require('./getScoopDeals'));

module.exports = indexRouter;