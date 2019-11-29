
const homePageRouter = require('express').Router();
const { homePageCtrl } = require('../../controllers/homePageCtrl');


// The home page will load one product from each list just to
// use the pictures to display on the cards

// "/api/v1"
homePageRouter.get('/', homePageCtrl)

exports = module.exports = homePageRouter;