
const models = require('../models');
const { loginAuth, getProductsList, getSingleProduct } = require("../../helpers/");


const assessPrices = (listOfProducts, access_token) => {
  console.log('listOfProducts',listOfProducts);
  return new Promise((resolve, reject)=>{
    getProductsList(access_token, `/api/my/feed?page=1&per_page=40`)
      .then(dataFromAPI => {
        let promiseArray1 = [];

        for (let i = 0; i < listOfProducts.listings.length; i++) {
          promiseArray1.push(getSingleProduct(access_token, listOfProducts.listings[i]._links.self.href));
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
              resolve({
                products: allListings,
                nextPage: listOfProducts._links.next.href,
              });
              if(allListings.length === 0) reject({listings: []})
            })
          })
        })
  })
}