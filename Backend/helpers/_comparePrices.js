
const cheerio = require('cheerio');
// This will take a look at the database and compare the average price of an item
// to the listed prices for currently low priced listings


/*
*** PRICE COMPARISONS ***

To get the price of a product:
the price is saved as an integer in cents, so it has 2 extra integers on the the end,
so $500 is saved as 50000 cents
so i need to cenvert it to a dollar integer, or convert the price guide price to a price in cents. either/or

To get to the price guide data:
The price guide values literally saved on the same damn object as the product price itself,
so i can get both of those values in one api call lmao
productObj.price.amount_cents

originalProductObj._links.self.href
ex: "/api/listings/11150266-squier-classic-vibe-50s-telecaster-vintage-blonde"
this will take you to full listing endpoint for that item,
which has the price-guide data on it's object
then:
listingObj._embedded.price_guide.estimated_value.bottom_price
listingObj._embedded.price_guide.estimated_value.top_price
these are both integers already

*/


module.exports = (productObj) => {
  let isGoodDeal;
  let avgMarketPrice = ((productObj._embedded.price_guide.estimated_value.bottom_price + productObj._embedded.price_guide.estimated_value.top_price) /2);

  let productPrice = productObj.price.amount_cents.toString();
  let finalPrice = +productPrice.slice(0,string.length-2);
  let percentOfMarketPrice = finalPrice/avgMarketPrice;
  let percentBelowMarketPrice = (avgMarketPrice-finalPrice)/(avgMarketPrice);


  if(finalPrice < avgMarketPrice){
    isGoodDeal = true;
  }else{
    isGoodDeal = false;
  }

  let dealInfo = {
    finalPrice,
    percentOfMarketPrice,
    percentBelowMarketPrice,
    isGoodDeal
  }
  return dealInfo;
}