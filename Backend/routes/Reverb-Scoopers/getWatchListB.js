const watchlistRouter = require('express').Router();
const { loginAuth, getProductsList, comparisonShopping, priceGuide, getCompShopData, getSingleProduct } = require("../../helpers/index.js");

// "/mywatchlist"
watchlistRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  // then send the auth token in the header of the GET request

  loginAuth().
  then(token=>{
    getProductsList(token.access_token, "/api/wants")
    .then(dataFromAPI=>{
      let promiseArray1 = [];
      productsArray = [];
      // console.log('dataFromAPI',dataFromAPI);
      for(let i = 0; i < dataFromAPI.listings.length; i++){
        promiseArray1.push(getSingleProduct(token.access_token, dataFromAPI.listings[i]._links.self.href));
      }
      Promise.all(promiseArray1).then(listings=>{
        let promiseArray2 = [];
        let listingsWithPriceGuideData = listings.filter((listing)=>listing.SCOOP.hasPriceGuide).map(listing=>priceGuide(listing))
        // let listingsWithNeither = listings.filter((listing)=>listing.SCOOP.hasNeither)
        listings
        .filter((listing)=>listing.SCOOP.hasCompShop)
        .map(listing=>{
          promiseArray2.push(getCompShopData(token.access_token, listing));
          });
        Promise.all(promiseArray2)
        .then(listingsWithCompShopData=>{
          // console.log('listingsWithCompShopData777777777777777777777777777777777777777777777777777777777777777777777',listingsWithCompShopData);
          let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
          res.send(allListings);
        })
        // need to concat the three sets of listings here then return the giant list
        // let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData, listingsWithNeither);
      })
    })
  })
  .catch(error=>{if(error){console.log('execution error: ',error);}
  })
});

exports = module.exports = watchlistRouter;