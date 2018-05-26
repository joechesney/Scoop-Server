
const homePageRouter = require('express').Router();
const { getFeedPics } = require('../../controllers/homePageCtrl');


// The home page will load one product from each list just to
// use the pictures to display on the cards

// "/scoop/home"
homePageRouter.get('/', getFeedPics)

exports = module.exports = homePageRouter;