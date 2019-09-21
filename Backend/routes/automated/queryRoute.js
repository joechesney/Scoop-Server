
const queryRouter = require('express').Router();
const { queryForProductCtrl } = require('../../controllers/queryForProductCtrl');

queryRouter.get('/', queryForProductCtrl);

exports = module.exports = queryRouter;