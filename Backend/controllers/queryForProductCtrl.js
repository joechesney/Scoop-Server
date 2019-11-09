
const {
  loginAuth,
  hyperionService
} = require("../models/");


module.exports.queryForProductCtrl = (req, res, next) => {
  loginAuth()
  .then(async({ access_token }) => {
    // 1. get the listings
    const hypeListings = await hyperionService(access_token);
    const ids = hypeListings.listings.map((listing) => listing.id);
    
    res.send(ids)
  })
  .catch(err => next(err))
}
