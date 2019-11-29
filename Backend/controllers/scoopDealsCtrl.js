
const { loginAuth } = require("../services/");
const { assessScoopDeals } = require("../services/assessScoopDeals");
module.exports.scoopDealsCtrl = (req, res, next) => {
  
  loginAuth()
  .then((token) => {
    res.send(assessScoopDeals(token, `/api/my/feed?page=1&per_page=40`));
  })
}