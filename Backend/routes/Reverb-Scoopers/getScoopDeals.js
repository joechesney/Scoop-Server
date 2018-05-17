
const scoopDealsRouter = require('express').Router();
const { loginAuth,
  getProductsList,
  comparisonShopping,
  priceGuideHelper,
  getCompShopData,
  getSingleProduct,
  sendText, } = require("../../helpers/index.js");

var arrayOfScoops = [];
let pageCounter = 1;

// "/scoop/home"
scoopDealsRouter.get('/', function (req, res, next) {
  console.log('scoopDealsRouter');
  const getThoseMugs = (access_token, url) => {
    getProductsList(access_token, url)
      .then(dataFromAPI => {
        let promiseArray1 = [];
        console.log('pageCounter', pageCounter);
        console.log('URL: ', url);
        productsArray = [];
        for (let i = 0; i < dataFromAPI.listings.length; i++) {
          promiseArray1.push(getSingleProduct(access_token, dataFromAPI.listings[i]._links.self.href));
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
              if (arrayOfScoops.length < 10 && allListings.length > 0) {
                pageCounter++;
                getThoseMugs(access_token, `/api/my/feed?page=${pageCounter}&per_page=40`)
              } else {
                res.send(arrayOfScoops);
              }
            })
        })
      })
  }
  loginAuth().then(token => {
    getThoseMugs(token.access_token, `/api/my/feed?page=${pageCounter}&per_page=40`);
  })
})

exports = module.exports = scoopDealsRouter;