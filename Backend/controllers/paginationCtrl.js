
const { priceGuideHelper } = require("../helpers/");
const { loginAuth, getSingleProduct, getProductsList, getCompShopData } = require("../models/");

module.exports.showMoreProducts = (req, res, next) => {

  loginAuth().then(token => {
    getProductsList(token.access_token, req.body.nextPage)
      .then(dataFromAPI => {
        let promiseArray1 = [];
        productsArray = [];
        for (let i = 0; i < dataFromAPI.body.listings.length; i++) {
          promiseArray1.push(getSingleProduct(token.access_token, dataFromAPI.body.listings[i]._links.self.href));
        }
        Promise.all(promiseArray1).then(listings => {
          let promiseArray2 = [];
          let listingsWithPriceGuideData = listings.filter((listing) => listing.SCOOP.hasPriceGuide).map(listing => priceGuideHelper(listing));

          // i know this isnt being assigned to anything.
          // im just doing it to create promiseArray2
          listings
            .filter((listing) => listing.SCOOP.hasCompShop)
            .map(listing => {
              promiseArray2.push(getCompShopData(token.access_token, listing));
            });
          Promise.all(promiseArray2)
            .then(listingsWithCompShopData => {
              // sendText();
              let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
              res.send({
                products: allListings,
                nextPage: dataFromAPI.body._links.next.href,
              });
            })
        })
      })
  })

}