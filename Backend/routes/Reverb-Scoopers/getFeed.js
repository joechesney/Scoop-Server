const feedRouter = require('express').Router();
const request = require('request');
const { loginAuth, getAPIData } = require("../../helpers/");


// "/myfeed"
feedRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  // then send the auth token in the header of the GET request
  loginAuth().
  then(token=>{
    return getAPIData(token.access_token, "/my/feed");
  })
  .then(dataFromAPI=>{
    res.send(dataFromAPI);
  })
  .catch(error=>{if(error){console.log('execution error: ',error);}
  })
});

exports = module.exports = feedRouter;