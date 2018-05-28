
const { priceGuideHelper } = require("../helpers/");
const { loginAuth, getSingleProduct, getProductsList, getCompShopData } = require("../models/");


module.exports.assessScoopDeals = (req, res, next) => {
  var arrayOfScoops = [];
  let pageCounter = 1;

  // Here, I have to declare a function that gets results
  // which I am immediately calling down at the bottom
  // That way, I can keep running the function over and over
  // until I have enough results, or there are no more results to get
  // There are probably worse ways to do this! :D

  const getOnePageOfProducts= (access_token, url) => {
    getProductsList(access_token, url)
    .then(dataFromAPI => {
      let promiseArray1 = [];

      productsArray = [];
      for (let i = 0; i < dataFromAPI.body.listings.length; i++) {
        promiseArray1.push(getSingleProduct(access_token, dataFromAPI.body.listings[i]._links.self.href));
      }
      Promise.all(promiseArray1)
      .then(listings => {
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
          // sendText();
          let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
          allListings.forEach(listing => {
            if (listing.SCOOP.isGoodDeal) arrayOfScoops.push(listing);
          })
          if (arrayOfScoops.length < 20 && allListings.length > 0) {
            pageCounter++;
            getOnePageOfProducts(access_token, `/api/my/feed?page=${pageCounter}&per_page=40`)
          } else {
            res.send({
              products: arrayOfScoops,
              pageCounter,
            });
          }
        })
      })
    })
  }

  loginAuth()
  .then(({access_token}) => {
    getOnePageOfProducts(access_token, `/api/my/feed?page=${pageCounter}&per_page=40`);


  })
}