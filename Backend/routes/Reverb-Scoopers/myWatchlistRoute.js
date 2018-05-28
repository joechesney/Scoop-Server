
const watchlistRouter = require('express').Router();
const { assessMyWatchlistPrices } = require('../../controllers/myWatchlistCtrl');
// Note that the pagination controller is shared on 3 views
const { showMoreProducts } = require('../../controllers/paginationCtrl.js');

// "/mywatchlist"
watchlistRouter.get('/', assessMyWatchlistPrices);
watchlistRouter.post('/', showMoreProducts);

exports = module.exports = watchlistRouter;