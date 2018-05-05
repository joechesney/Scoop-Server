const watchlistRouter = require('express').Router();
const { loginAuth, getProductsList } = require("../../helpers/index.js");

// "/mywatchlist"
watchlistRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  // then send the auth token in the header of the GET request

  loginAuth().
  then(token=>{
    return getProductsList(token.access_token, "/api/wants");
  })
  .then(dataFromAPI=>{

    /*
      To get to the listings object with all the used/new listings (if necessary):
      this is on the product obj
      productObj._links.web.href
      productObj._links.comparison_shopping.href
      the next link is on the obj that comes back from the above link (comparison_shopping)
      productObj._links.web.used_listings
      productObj._links.web.new_listings


      *** PRICE COMPARISONS ***

      To get the price of a product:
      the price is saved as an integer in cents, so it has 2 extra integers on the the end,
      so $500 is saved as 50000 cents
      so i need to cenvert it to a dollar integer, or convert the price guide price to a price in cents. either/or

      To get to the price guide data:
      The price guide values literally saved on the same damn object as the product price itself,
      so i can get both of those values in one api call lmao

      originalProductObj._links.self.href
      ex: "/api/listings/11150266-squier-classic-vibe-50s-telecaster-vintage-blonde"
      this will take you to full listing endpoint for that item,
      which has the price-guide data on it's object
      then:
      listingObj._embedded.price_guide.estimated_value.bottom_price
      listingObj._embedded.price_guide.estimated_value.top_price
      these are both integers already

    */
    res.send(dataFromAPI.listings[0]);
  })
  .catch(error=>{if(error){console.log('execution error: ',error);}
  })
});

exports = module.exports = watchlistRouter;