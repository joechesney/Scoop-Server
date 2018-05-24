const feedRouter = require('express').Router();
const { assessMyFeedPrices } = require('../../controllers/myFeedCtrl');



// DELETE THIS
const { loginAuth, getProductsList, getSingleProduct } = require("../../models/");


// "/myFeed"
feedRouter.get('/', assessMyFeedPrices);

feedRouter.post('/', (req, res, next) => {
  console.log('post req',req.body);

})

exports = module.exports = feedRouter;