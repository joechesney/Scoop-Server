
const scoopDealsRouter = require('express').Router();
const { assessScoopDeals } = require('../../controllers/scoopDealsCtrl');

// "/scoop/scoopDeals"
scoopDealsRouter.get('/', assessScoopDeals);

exports = module.exports = scoopDealsRouter;