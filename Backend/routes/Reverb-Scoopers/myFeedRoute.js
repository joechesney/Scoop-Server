
const feedRouter = require('express').Router();
const { assessMyFeedPrices } = require('../../controllers/myFeedCtrl');
// Note that the pagination controller is shared on 3 views
const { showMoreProducts } = require('../../controllers/paginationCtrl');

// "/myFeed"
feedRouter.get('/', assessMyFeedPrices);
feedRouter.post('/', showMoreProducts);

exports = module.exports = feedRouter;