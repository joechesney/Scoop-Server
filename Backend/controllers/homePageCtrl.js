const { loginAuth, getSingleProduct, getProductsList, getCompShopData } = require("../services/");


module.exports.homePageCtrl = (req, res, next) => {
  let objectOfProductPictures = {};
  loginAuth().then(token => {
    getProductsList(token, "/api/my/feed?page=1&per_page=2")
    .then(feedProducts => {
      if(!feedProducts.body.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.myFeedPic = feedProducts.body.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.myFeedPic = feedProducts.body.listings[0].photos[0]._links.small_crop.href;
      }
      return getProductsList(token, "/api/wants?page=1&per_page=2");
    })
    .then(watchlistProducts => {
      if(!watchlistProducts.body.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.myWatchlistPic = watchlistProducts.body.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.myWatchlistPic = watchlistProducts.body.listings[0].photos[0]._links.small_crop.href;
      }
      return getProductsList(token, "/api/handpicked/deals?page=1&per_page=2");
    })
    .then(reverbDealsProducts => {
      if(!reverbDealsProducts.body.listings[0].photos[0]._links.small_crop.href){
        objectOfProductPictures.reverbDealsPic = reverbDealsProducts.body.listings[1].photos[0]._links.small_crop.href;
      } else {
        objectOfProductPictures.reverbDealsPic = reverbDealsProducts.body.listings[0].photos[0]._links.small_crop.href;
      }
      objectOfProductPictures.scoopDealsPic = "https://images.reverb.com/image/upload/s--icqa3i4G--/a_exif,c_thumb,f_auto,fl_progressive,g_south,h_296,q_auto:eco,w_296/v1524431177/npuixhqpuakhfkkhzui5.jpg";
      res.send(
        objectOfProductPictures,
      );
    })
  })
  .catch(err => console.log('err : ', err));
}