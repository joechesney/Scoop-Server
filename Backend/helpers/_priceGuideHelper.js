
// This function is used by the getSingleProduct function to
// determine assign SCOOP values to price data found on the _embedded
// property of the product. Only products that have the _embdedded property
// should be passed into this function, which makes my conditional
// in this function redundant, but I left it in to catch errors
// and outlier cases
module.exports = (productObj) => {
  if (productObj._embedded !== undefined) {

    let isGoodDeal; // boolean
    let avgMarketPrice = ((productObj._embedded.price_guide.estimated_value.bottom_price + productObj._embedded.price_guide.estimated_value.top_price) / 2);

    let productPrice = (+productObj.price.amount);
    let percentOfMarketPrice = 100 * (+productPrice / avgMarketPrice).toFixed(2);

    let decimalBelowMarketPrice = ((avgMarketPrice - productPrice) / (avgMarketPrice)).toFixed(2);
    let percentBelowMarketPrice = (decimalBelowMarketPrice * 100).toFixed(0);

    if (productPrice < avgMarketPrice) {
      isGoodDeal = true;
    } else {
      isGoodDeal = false;
    }

    let dealInfo = {
      percentOfMarketPrice,
      percentBelowMarketPrice,
      avgMarketPrice,
      isGoodDeal,
      priceToDisplay: +productObj.price.amount,
      hasPriceGuide: true,
      hasCompShop: false,
      hasNeither: false,
    }
    productObj.SCOOP = dealInfo;
    return productObj;

  } else {
    // console.log('no embedded price guide info inside _priceGuideHelper: ', productObj.model);
    return new Error("no embedded price guide info inside _priceGuideHelper");
  }
}