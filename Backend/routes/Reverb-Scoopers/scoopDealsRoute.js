
const scoopDealsRouter = require('express').Router();
const ctrl = require('../../controllers/homePageCtrl');



// DELETE THIS
const { loginAuth,
  getProductsList,
  comparisonShopping,
  priceGuideHelper,
  getCompShopData,
  getSingleProduct,
  sendText, } = require("../../helpers/index.js");


// Example Router:
/*
'use strict';
const homePageRouter = require('express').Router();
const { addFantasyTeam } = require("../controllers/teamCtrl");

homePageRouter.post("/fantasyTeam", addFantasyTeam);

module.exports = homePageRouter;
*/



var arrayOfScoops = [];
let pageCounter = 1;

// "/scoop/scoopDeals"
scoopDealsRouter.get('/', function (req, res, next) {

  console.log('req.body: ',req.body);
  const getThoseMugs = (access_token, url) => {
    getProductsList(access_token, url)
      .then(dataFromAPI => {
        let promiseArray1 = [];

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
              if (arrayOfScoops.length < 20 && allListings.length > 0) {
                pageCounter++;
                getThoseMugs(access_token, `/api/my/feed?page=${pageCounter}&per_page=40`)
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

  // This function was giving me major issues.
  // Somehow, these issues were fixed by defining my anonymous function
  // with a name, and then immediately calling that function
  loginAuth().then(token => {
    getThoseMugs(token.access_token, `/api/my/feed?page=${pageCounter}&per_page=40`);
  })
})

exports = module.exports = scoopDealsRouter;