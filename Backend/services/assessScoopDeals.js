const { getSingleProduct, getProductsList, getCompShopData } = require("../services/");
const { priceGuideHelper } = require("../utils/");

const assessScoopDeals = async (token, url) => {
  return new Promise((resolve, reject) => {
    getProductsList(token, url)
    .then(dataFromAPI => {
      const promiseArray1 = dataFromAPI.body.listings
      .map(listing => getSingleProduct(token, listing));
      
      Promise.all(promiseArray1)
      .then(listings => {
        let listingsWithPriceGuideData = listings
        .filter((listing) => listing.SCOOP.hasPriceGuide)
        .map(listing => priceGuideHelper(listing));
        
        const promiseArray2 = listings
        .filter((listing) => listing.SCOOP.hasCompShop)
        .map(listing => getCompShopData(token, listing));
        
        Promise.all(promiseArray2)
        .then(listingsWithCompShopData => {
          const allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
          
          const arrayOfScoops = allListings.filter(listing => listing.SCOOP.isGoodDeal);
          resolve( {
            products: arrayOfScoops || []
          });
        })
      })
    })
  })
}

module.exports.assessScoopDeals = assessScoopDeals;