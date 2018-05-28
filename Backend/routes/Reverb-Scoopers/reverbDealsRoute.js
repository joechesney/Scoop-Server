
const reverbDealsRouter = require('express').Router();
const { assessReverbDeals, showMoreProducts } = require('../../controllers/reverbDealsCtrl');



// "/scoop/home"
reverbDealsRouter.get('/', assessReverbDeals );
reverbDealsRouter.post('/', showMoreProducts );

exports = module.exports = reverbDealsRouter;