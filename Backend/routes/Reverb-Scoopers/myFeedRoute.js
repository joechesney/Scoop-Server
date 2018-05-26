const feedRouter = require('express').Router();
const { assessMyFeedPrices } = require('../../controllers/myFeedCtrl');

// "/myFeed"
feedRouter.get('/', assessMyFeedPrices);

feedRouter.post('/', (req, res, next) => {
  console.log('post req',req.body);

})

exports = module.exports = feedRouter;