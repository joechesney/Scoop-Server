const watchlistRouter = require('express').Router();
const { loginAuth, getProductsList, comparisonShopping, priceGuide } = require("../../helpers/index.js");

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
      console.log('dataFROMAPI');
      Promise.all(promiseArray1).then(listings=>{
        let listingsWithPriceGuideData = listings.filter((listing)=>listing.SCOOP.hasPriceGuide).map(listing=>priceGuide(listing))
        console.log('listings',listingsWithPriceGuideData);
        // let listingsWithNeither = listings.filter((listing)=>listing.SCOOP.hasNeither)
        // let listingsWithCompShopData = listings
        // .filter((listing)=>listing.SCOOP.hasCompShop)
        // .map(listing, ()=>{
        //   getSingleProduct(token.access_token, listing._links.comparison_shopping)
        //   .then(compShopData=>{
        //     listing.compShopData = compShopData;

        //     })
        //   });
        //   // need to concat the three sets of listings here then return the giant list
        //   let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData, listingsWithNeither);
          res.send(listingsWithPriceGuideData);
      })
    })
  })
  .catch(error=>{if(error){console.log('execution error: ',error);}
  })
});

exports = module.exports = watchlistRouter;