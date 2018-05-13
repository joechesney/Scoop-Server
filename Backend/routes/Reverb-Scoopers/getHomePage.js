
const homePageRouter = require('express').Router();
const getHomePageLists = require('../../helpers/getHomePageLists');
const loginAuth = require('../../helpers/loginAuth');

// "/scoop/home"
homePageRouter.get('/', function (req, res, next) {
  loginAuth().then(token => {
    getHomePageLists(token.access_token)
      .then(something => {
        console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', something);
        res.send(something);
      })
  })
})

exports = module.exports = homePageRouter;