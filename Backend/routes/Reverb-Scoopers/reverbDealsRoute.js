
const reverbDealsRouter = require('express').Router();
const { assessReverbDeals } = require('../../controllers/reverbDealsCtrl');



// "/scoop/home"
reverbDealsRouter.get('/', assessReverbDeals );

exports = module.exports = reverbDealsRouter;