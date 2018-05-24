const feedRouter = require('express').Router();
const { loginAuth, getProductsList, getSingleProduct } = require("../../models/");


// "/myFeed"
feedRouter.get('/', function (req, res, next) {


  // call the login function and it will send back the auth token
  // then send the auth token in the header of the GET request
  loginAuth().
    then(token => {
      console.log('hello', token);
      assessPrices(dataFromAPI.body, token.access_token)
      .then(finalListings=>{
        res.send(finalListings);
      })
    })
    .catch(error => {
      if (error) res.send(error)
      // if (error) { next(error); }
    })
});

feedRouter.post('/', (req, res, next) => {
  console.log('post req',req.body);

})

exports = module.exports = feedRouter;