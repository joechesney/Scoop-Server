
const scoopDealsRouter = require('express').Router();
const { loginAuth,
  getProductsList,
  comparisonShopping,
  priceGuideHelper,
  getCompShopData,
  getSingleProduct,
  sendText, } = require("../../helpers/index.js");


// "/scoop/home"
scoopDealsRouter.get('/', function (req, res, next) {
  console.log('scoopDealsRouter');
  loginAuth().then(token => {
    getProductsList(token.access_token, "/api/listings/all")
    .then(dataFromAPI=>{
      // console.log('dataFromAPI',dataFromAPI);
      // res.send(dataFromAPI)
      let promiseArray1 = [];
      productsArray = [];
      for(let i = 0; i < dataFromAPI.listings.length; i++){
        promiseArray1.push(getSingleProduct(token.access_token, dataFromAPI.listings[i]._links.self.href));
      }
      Promise.all(promiseArray1).then(listings=>{
        let promiseArray2 = [];
        let listingsWithPriceGuideData = listings.filter((listing)=>listing.SCOOP.hasPriceGuide).map(listing=>priceGuideHelper(listing));

        // i know this isnt being assigned to anything.
        // im just doing it to create promiseArray2
        listings
        .filter((listing)=>listing.SCOOP.hasCompShop)
        .map(listing=>{
          promiseArray2.push(getCompShopData(token.access_token, listing));
        });
        Promise.all(promiseArray2)
        .then(listingsWithCompShopData=>{
          // sendText();
          let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
          res.send(allListings);
        })
      })
    })
  })
})

exports = module.exports = scoopDealsRouter;