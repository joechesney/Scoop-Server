
// This function is used by the getSingleProduct function to
module.exports = (productObj) => {
  // I made this a promise because I was hitting a race conidition without it
    if(productObj._embedded !== undefined){
      let isGoodDeal;
      let avgMarketPrice = ((productObj._embedded.price_guide.estimated_value.bottom_price + productObj._embedded.price_guide.estimated_value.top_price) /2);

      let productPrice = (+productObj.price.amount) ;
      let percentOfMarketPrice = 100 * (+productPrice/avgMarketPrice).toFixed(2);

      let decimalBelowMarketPrice = ((avgMarketPrice-productPrice)/(avgMarketPrice)).toFixed(2);
      let percentBelowMarketPrice = decimalBelowMarketPrice * 100;

      if(productPrice < avgMarketPrice){
        isGoodDeal = true;
      }else{
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
      console.log('WTFFFFFFFFF in priceGuide',productObj.model);
      return new Error("no embedded price guide info bro")
    }
}