const watchlistRouter = require('express').Router();
const { assessMyWatchlistPrices } = require('../../controllers/myWatchlistCtrl');

// "/mywatchlist"
watchlistRouter.get('/', assessMyWatchlistPrices);

exports = module.exports = watchlistRouter;