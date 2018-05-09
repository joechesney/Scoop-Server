
// This function is used by the getSingleProduct function to
module.exports = (productObj) => {
  // I made this a promise because I was hitting a race conidition without it
  return new Promise((resolve, reject)=>{
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
      }
      productObj.SCOOP = dealInfo;

      resolve(productObj);

    } else if((productObj._embedded == undefined) && (productObj._links.comparison_shopping)){
      // These products do not have the convenient embedded data,
      // but i cna send a get request to the appi endpoint on
      // comparison_shopping and see what it has

      // productObj.SCOOP.comparison_shopping.href = productObj._links.comparison_shopping.href;
      // console.log('Has comparison URL:',productObj.model);
      resolve(productObj);
    } else if((productObj._embedded == undefined) && (!productObj._links.comparison_shopping)){
      // these products have no useful data at all.
      // i might be able to look through their links to
      // try to find something i compare it to, but most
      // likely i will just display these with a message like
      // "No average price data for this product"
      console.log('no embedded or comparison shopping url',productObj.model);
      resolve(productObj)

    } else {
      console.log('WTFFFFFFFFF',productObj);
      reject(new Error("no embedded price guide info bro"))
    }

  })
}