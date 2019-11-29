
const scoopDealsRouter = require('express').Router();
const { scoopDealsCtrl } = require('../../controllers/scoopDealsCtrl');

// "/scoop/scoopDeals"
scoopDealsRouter.get('/', scoopDealsCtrl);

exports = module.exports = scoopDealsRouter;