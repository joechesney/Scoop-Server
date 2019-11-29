"use strict";

const { Router } = require('express');
const indexRouter = Router();

// /api/v1
indexRouter.use('/myFeed', require('./myFeedRoute'));
indexRouter.use('/myWatchlist', require('./myWatchlistRoute'));
indexRouter.use('/homePage', require('./homePageRoute'));
indexRouter.use('/reverbDeals', require('./reverbDealsRoute'));
indexRouter.use('/scoopDeals', require('./scoopDealsRoute'));

module.exports = indexRouter;