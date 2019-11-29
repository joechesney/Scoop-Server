
const { loginAuth } = require("../services/");
const { assessScoopDeals } = require("../services/assessScoopDeals");
module.exports.scoopDealsCtrl = (req, res, next) => {
  
  loginAuth()
  .then(async(token) => {
    const scoopDeals = await assessScoopDeals(token, `/api/my/feed?page=1&per_page=40`);
    res.send(scoopDeals);
  })
}