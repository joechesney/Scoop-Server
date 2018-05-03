"use strict";

const { Router } = require('express');
const indexRouter = Router();

indexRouter.use('/login', require('./login'));

indexRouter.use('/feed', require('./getFeed'));
indexRouter.use('/watchlist', require('./getWatchlist'));
// indexRouter.use('/listings', require('./getListings'));
// indexRouter.use('/prices', require('./getPrices'));

module.exports = indexRouter;