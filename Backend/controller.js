// This file will control the execution of all the other files.
// The flow of data goes like this:
/*
  1. getWatchList
  2. getListings/getPrice-GuidePrices (can be done asynchronously, if possible)
  4. _priceGuide
  5. send any listings that bring up good deals to the front end/send notification to browser
*/
const routes = require('./routes/index');
const helpers = require('./helpers');
