// This file will control the execution of all the other files.
// The flow of data goes like this:
/*
  1. getWatchList/createDb (Both need to be finished before anything else should start)
  2. getPrices/getListings (can be done asynchronously, if possible)
  3. savePrices/saveListings (dont fuck this up)
  4. _comparePrices
  5. send any listings that bring up good deals to the front end

*/