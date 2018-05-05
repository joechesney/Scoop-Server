
// This function is used by the getSingleProduct function to
module.exports = (productObj) => {
  // I made this a promise because I was hitting a race conidition without it
  return new Promise((resolve, reject)=>{
    if(productObj._embedded !== undefined){
      let isGoodDeal;
      let avgMarketPrice = ((productObj._embedded.price_guide.estimated_value.bottom_price + productObj._embedded.price_guide.estimated_value.top_price) /2);

      let productPrice = +productObj.price.amount;
      let percentOfMarketPrice = 100 * (+productPrice/avgMarketPrice);
      let percentBelowMarketPrice = ((avgMarketPrice-productPrice)/(avgMarketPrice));

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
      }
      productObj.SCOOP = dealInfo;

      resolve(productObj);

    } else if(productObj._embedded == undefined){
      resolve(productObj);
    } else { reject(new Error("no embedded price guide info bro"))}

  })
}