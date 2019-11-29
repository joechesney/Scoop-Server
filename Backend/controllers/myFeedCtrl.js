
const { priceGuideHelper } = require("../utils/");
const { loginAuth, getSingleProduct, getProductsList, getCompShopData } = require("../services/");


module.exports.assessMyFeedPrices = (req, res, next) => {
  loginAuth()
  .then( token => {
    getProductsList(token, `/api/my/feed?page=1&per_page=40`)
    .then(dataFromAPI => {

      const promiseArray1 = dataFromAPI.body.listings
        .map((listing) => getSingleProduct(token, listing));

      Promise.all(promiseArray1)
      .then(listings => {

        const listingsWithPriceGuideData = listings
          .filter((listing) => listing.SCOOP.hasPriceGuide)
          .map(listing => priceGuideHelper(listing));
        
        const promiseArray2 = listings
          .filter((listing) => listing.SCOOP.hasCompShop)
          .map(listing => getCompShopData(token, listing));

        Promise.all(promiseArray2)
        .then(listingsWithCompShopData => {

          const allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
          res.send({
            products: allListings,
            nextPage: dataFromAPI.body._links.next.href,
          });
        })
      })
    })
  })

}
