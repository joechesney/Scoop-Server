const feedRouter = require('express').Router();
const request = require('request');
const { loginAuth, getProductsList, comparePrices, getSingleProduct } = require("../../helpers/");


// "/myfeed"
feedRouter.get('/', function (req, res, next) {
  // call the login function and it will send back the auth token
  // then send the auth token in the header of the GET request
  loginAuth().
  then(token=>{
    getProductsList(token.access_token, "/api/my/feed")
    .then(dataFromAPI=>{
      let promiseArray = [];
      for(let i = 0; i < dataFromAPI.listings.length; i++){
        promiseArray.push(getSingleProduct(token.access_token, dataFromAPI.listings[i]._links.self.href));
      }

      Promise.all(promiseArray).then(listings=>{
        if(listings){
          res.send(listings);
        }
      })
    })
  })
  .catch(error=>{if(error){next(error);}
  })
});

exports = module.exports = feedRouter;