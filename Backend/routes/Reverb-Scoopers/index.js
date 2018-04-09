"use strict";

const { Router } = require('express');
const productsIndexRouter = Router();

productsIndexRouter.use('/watchlist', require('./getWatchlist'));
// productsIndexRouter.use('/listings', require('./getListings'));
// productsIndexRouter.use('/prices', require('./getPrices'));

module.exports = productsIndexRouter;