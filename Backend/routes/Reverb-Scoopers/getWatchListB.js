const watchlistRouter = require('express').Router();
const { loginAuth, getProductsList } = require("../../helpers/index.js");

// "/mywatchlist"
watchlistRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  // then send the auth token in the header of the GET request

  loginAuth().
  then(token=>{
    getProductsList(token.access_token, "/api/wants")
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
  .catch(error=>{if(error){console.log('execution error: ',error);}
  })
});

exports = module.exports = watchlistRouter;