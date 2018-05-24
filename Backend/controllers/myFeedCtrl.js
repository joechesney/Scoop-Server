
const models = require('../models');
const { priceGuideHelper } = require("../helpers/");
const { loginAuth, getSingleProduct, getProductsList, getCompShopData } = require("../models/");


const assessMyFeedPrices = (req, res, next) => {
  loginAuth()
  .then(({access_token})=>{
    getProductsList(access_token, `/api/my/feed?page=1&per_page=40`)
    .then(dataFromAPI => {
      console.log('777777777777777777777777777777777777777777',dataFromAPI.body);
      let promiseArray1 = [];

      for (let i = 0; i < dataFromAPI.body.listings.length; i++) {
        promiseArray1.push(getSingleProduct(access_token, dataFromAPI.body.listings[i]._links.self.href));
      }
      Promise.all(promiseArray1).then(listings => {
        let promiseArray2 = [];
        let listingsWithPriceGuideData = listings.filter((listing) => listing.SCOOP.hasPriceGuide).map(listing => priceGuideHelper(listing));

        // i know this isnt being assigned to anything.
        // im just doing it to create promiseArray2
        listings
        .filter((listing) => listing.SCOOP.hasCompShop)
        .map(listing => {
            promiseArray2.push(getCompShopData(access_token, listing));
          });
        Promise.all(promiseArray2)
        .then(listingsWithCompShopData => {

            let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
            console.log('allListings',allListings);
            res.send({
              products: allListings,
              nextPage: dataFromAPI.body._links.next.href,
            });
            if(allListings.length === 0) res.next({listings: []})
          })
        })
      })
    })

}

module.exports = {
  assessMyFeedPrices,
}