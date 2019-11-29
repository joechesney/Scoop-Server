
const {
  loginAuth,
  hyperionService
} = require("../services/");


module.exports.queryForProductCtrl = (req, res, next) => {
  loginAuth()
  .then(async(token) => {
    // 1. get the listings
    const hypeListings = await hyperionService(token);
    const ids = hypeListings.listings.map((listing) => listing.id);
    
    res.send(ids)
  })
  .catch(err => next(err))
}
