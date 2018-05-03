const { Router } = require('express');
const feedRouter = Router();

// "/myfeed"
const fs = require('fs');
const request = require('request');
const { loginAuth, getAPIData } = require("../../helpers/");


feedRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token

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