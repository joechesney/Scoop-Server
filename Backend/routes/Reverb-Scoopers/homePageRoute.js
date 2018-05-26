
const homePageRouter = require('express').Router();
const ctrl = require('../../controllers/homePageCtrl');



/**** DELETE BELOW THIS */
const getProductsList = require('../../models/getProductsList');
// const { getThoseMugs } = require('./getScoopDeals');
const loginAuth = require('../../models/loginAuth');
/**** DELETE ABOVE THIS */



// Example Router:
/*
'use strict';
const homePageRouter = require('express').Router();
const { addFantasyTeam } = require("../controllers/teamCtrl");

homePageRouter.post("/fantasyTeam", addFantasyTeam);

module.exports = homePageRouter;
*/




// The home page will load one product from each list just to
// use the pictures to display on the cards

const getFeedPic = (token, url) => {
  return new Promise((resolve, reject)=>{

  })
}


// "/scoop/home"
homePageRouter.get('/', function (req, res, next) {
  let objectOfProductPictures = {};

  loginAuth().then(token => {
    getProductsList(token.access_token, "/api/my/feed?page=1&per_page=2")
    .then(feedProducts => {
      console.log('feedProducts',feedProducts.body);
      if(!feedProducts.body.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.myFeedPic = feedProducts.body.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.myFeedPic = feedProducts.body.listings[0].photos[0]._links.small_crop.href;
      }
      return getProductsList(token.access_token, "/api/wants?page=1&per_page=2");
    })
    .then(watchlistProducts => {
      if(!watchlistProducts.body.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.myWatchlistPic = watchlistProducts.body.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.myWatchlistPic = watchlistProducts.body.listings[0].photos[0]._links.small_crop.href;
      }
      return getProductsList(token.access_token, "/api/handpicked/deals?page=1&per_page=2");
    })
    .then(reverbDealsProducts => {
      if(!reverbDealsProducts.body.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.reverbDealsPic = reverbDealsProducts.body.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.reverbDealsPic = reverbDealsProducts.body.listings[0].photos[0]._links.small_crop.href;
      }
      // return promise to get the scoop deals
      objectOfProductPictures.scoopDealsPic = "https://images.reverb.com/image/upload/s--icqa3i4G--/a_exif,c_thumb,f_auto,fl_progressive,g_south,h_296,q_auto:eco,w_296/v1524431177/npuixhqpuakhfkkhzui5.jpg";
      res.send(
        objectOfProductPictures,
      );
    })
  })
})

exports = module.exports = homePageRouter;