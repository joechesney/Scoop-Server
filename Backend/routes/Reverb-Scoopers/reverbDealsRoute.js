
const reverbDealsRouter = require('express').Router();
const { assessReverbDeals } = require('../../controllers/reverbDealsCtrl');
// Note that the pagination controller is shared on 3 views
const { showMoreProducts } = require('../../controllers/paginationCtrl.js');

// "/scoop/home"
reverbDealsRouter.get('/', assessReverbDeals );
reverbDealsRouter.post('/', showMoreProducts );

exports = module.exports = reverbDealsRouter;