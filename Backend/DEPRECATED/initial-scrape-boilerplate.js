
// This file is the original boilerplate that I received
// for scraping data off of a webpage. I am only leaving it
// as part of the story of how this project started as a
// scraper and was pivoted to usign API data. It is never used
// or called anywhere in the application


/*
  1. Needs to go to 'My Feed/customize' Page. This page has an anchor
        on a magnifying glass( with the class feed-customize__item__action--visit)
        that will take you to the main page for that item
  2. Once on the item page, there is an anchor that has no special class on it,
        but it has <i class="fa fa-angle-right"></i> inside the anchor tag,
        as well as the string "view in price guide" inside the anchor,
        and this anchor has the url of the price guide, and if clicked
        will take oyu to the price guide. NOT ALL items will have this link.
        For some reason, I think this link only shows up for items that are
        being followed in your 'My Feed' or are only available for certain items.
        If this anchor is not there, then do not load prices fo this item. Instead send
        back an error or say that the link wwas unavailable.
  3. Once on the price guide page, there is a <ul> tag with the classes
        'inline-list prices' Note the space in between those two class names.
        This is our target. it has one <li> tag with 2 <span> tags inside it.
        the spans have the class 'used' and only contain strings of the '$' character
        followed by integers. There are no spaces. These are the numbers we want
        to store as the average sell prices for this item.
  4. We need to store the average sell prices for each item on 'My Feed'.
        Then, we need to go back to the previous page: the one with all the listings
        for that item. Then grab the prices by donig this: Each listing is in a
        <div> with the class "product-row-card" which contains many <div>s including
        one with the class of "product-row-card__price" which itself has 2 <div>s
        inside of it. One with the class of "product-row-card__price__base" and one
        with the class "product-row-card__price__shipping". We need both of these
        strings. The second one a a plus sign and space inside the string, as well
        as both of them having the dollar sign. We will read the top three listings.
  5. The prices of the top three listings will be compared to the average price for
        that item. If the price is equal to or lesser than the average price, then
        a notification will be sent with the url of the item listing.
  6. This entire process will be repeated for each item on 'My Feed', multiple times
        per day.


*/

/*

  1. Need a module that gets the product ids of each item that i follow
      - from: "https://reverb.com/my/feed/customize"
  2. Need a module that retrieves the average sale prices for each of those items
      - from: https://reverb.com/price-guide/guide/8799-electro-harmonix-little-big-muff-pi
      - the items id number and name is in the the end of that url
  3. Need a module that retrieves the top 5 (lowest price) listings for each item
      - from: https://reverb.com/p/electro-harmonix-little-big-muff-reissue
      - only the item name is listed in this url
  4. Need a module that takes the price data from both of those urls
      and compares it to decide whether it is a good deal.
        - maybe 10-15% under the average price?
        - this module iwll return a list of good deals?

*/

/*
  I should be able to save price data for specific items only once
  If i save the item as having the id of the item itself on reverb,
  then there should never be duplicate items, and each time i grab
  average price data for that item, I can check the database for an
  item with that same id, and if its exists, then update its price
  values.

  Each listing will have a unique listing id that i can use to store
  them so they have unique rows, and the listings will have a product
  id that they reference

*/




const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

app.get('/scrape', function (req, res) {
  var options = {
    url: 'https://reverb.com/price-guide/guide/8799-electro-harmonix-little-big-muff-pi',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
    }
  };
  try {
  request(options, function (error, response, html) {
    console.log('error: ',error);
    if (!error) {

      const $ = cheerio.load(html);
      // Finally, we'll define the variables we're going to capture
      let product = { name: "", averageLow: "", averageHigh: "" };

      $('.heading-1').filter(function(){
        var data = $(this);
        product.name = data.text();
      });

      // Gets Average Low and High Prices
      $('.inline-list.prices').filter(function(){
        var data = $(this);
        product.averageLow = data.children('.strong').children().first().text().replace("$", "");
        product.averageHigh = data.children('.strong').children().last().text().replace("$", "");
        product.averagePrice = ((+product.averageHigh+(+product.averageLow))/2);
      });


      // To write to the system we will use the built in 'fs' library.
      // In this example we will pass 3 parameters to the writeFile function
      // Parameter 1 :  output.json - this is what the created filename will be called
      // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
      // Parameter 3 :  callback function - a callback function to let us know the status of our function

      fs.writeFile('output.json', JSON.stringify(product, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
      });

      // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
      res.send(product);
    } else if(error) console.log('error:',error);// end of 'if'

  }); // end of request

  } catch (error) {
      console.log('error:',error);
  }
});
