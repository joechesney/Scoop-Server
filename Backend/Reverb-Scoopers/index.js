"use strict";

const { Router } = require('express');
const productsIndexRouter = Router();

// productsIndexRouter.use('/listings', require('./getListings'));
// productsIndexRouter.use('/prices', require('./getPrices'));
productsIndexRouter.use('/watchlist', require('./getWatchlist'));


module.exports = productsIndexRouter;