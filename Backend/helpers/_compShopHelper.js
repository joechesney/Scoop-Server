// Only products that do not have price-guide data will be passed
// into this function. It should calculate the price based on the
// caomparison_shopping property of the object and send back
// the productObj with that determined value as the productObj.SCOOP.priceToDisplay

module.exports = (productObj) =>{

  if(+productObj.compShopData.used_low_price.amount > 0){
    let percentAboveLowestAvailable;
    // if the products price is above the used_low_price then show
    // its price compared to that low
    if(+productObj.price.amount > +productObj.compShopData.used_low_price.amount){
      // let percentOfMarketPrice = 100 * (+productPrice/avgMarketPrice).toFixed(2);

      percentAboveLowestAvailable = (100*(+productObj.price.amount/productObj.compShopData.used_low_price.amount).toFixed(2));

      productObj.SCOOP.percentAboveLowestAvailable =(-1)* (100 - percentAboveLowestAvailable).toFixed(2);

      productObj.SCOOP.lowestAvailable = +productObj.compShopData.used_low_price.amount;
      productObj.SCOOP.isLowestAvailable = false;

    // if the products price is equal to the used_low_price then
    // it is the best deal available
    } else if (+productObj.price.amount === +productObj.compShopData.used_low_price.amount){
      productObj.SCOOP.lowestAvailable = +productObj.price.amount;
      productObj.SCOOP.isLowestAvailable = true;
    }

    productObj.SCOOP.priceToDisplay = +productObj.price.amount;
    return productObj;
  } else {
    console.log('Product without either used low price or new low price',productObj.id);
    return productObj;
  }
}