// Only products that do not have price-guide data will be passed
// into this function. It should calculate the price based on the
// caomparison_shopping property of the object and send back
// the productObj with that determined value as the productObj.SCOOP.priceToDisplay

module.exports = (productObj) =>{

  if(+productObj.compShopData.used_low_price.amount > 0){
    let priceComparedToLow;
    // if the products price is above the used_low_price then show
    // its price compared to that low
    if(+productObj.price.amount > +productObj.compShopData.used_low_price.amount){
      priceComparedToLow = (100 - (100*(+productObj.price.amount/productObj.compShopData.used_low_price.amount)))
      console.log('priceComparedToLow',priceComparedToLow);
      console.log('product price:',+productObj.price.amount);
      console.log('lowest used price:',productObj.compShopData.used_low_price.amount);
      productObj.SCOOP.priceComparedToLow = priceComparedToLow;

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
    console.log('Product without either used low price or new low price',productObj);
    return productObj;
  }
}