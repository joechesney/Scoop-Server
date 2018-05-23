
const homePageRouter = require('express').Router();
const getProductsList = require('../../helpers/getProductsList');
const { getThoseMugs } = require('./getScoopDeals');
const loginAuth = require('../../helpers/loginAuth');

// The home page will load one product from each list just to use the pictures

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
      if(!feedProducts.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.myFeedPic = feedProducts.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.myFeedPic = feedProducts.listings[0].photos[0]._links.small_crop.href;
      }
      return getProductsList(token.access_token, "/api/wants?page=1&per_page=2");
    })
    .then(watchlistProducts => {
      if(!watchlistProducts.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.myWatchlistPic = watchlistProducts.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.myWatchlistPic = watchlistProducts.listings[0].photos[0]._links.small_crop.href;
      }
      return getProductsList(token.access_token, "/api/handpicked/deals?page=1&per_page=2");
    })
    .then(reverbDealsProducts => {
      if(!reverbDealsProducts.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.reverbDealsPic = reverbDealsProducts.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.reverbDealsPic = reverbDealsProducts.listings[0].photos[0]._links.small_crop.href;
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