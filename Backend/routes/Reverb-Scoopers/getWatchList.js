const { Router } = require('express');
const watchlistRouter = Router();
// This file will mainly contain a function to grab the
// watched items ids and names from the url "https://reverb.com/my/feed/customize"

// "/mywatchlist"

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const { loginAuth, getAPIData } = require("../../helpers/");

watchlistRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  loginAuth().
  then(token=>{

    res.send(getAPIData(token.access_token, "/wants"));

  })
});

exports = module.exports = watchlistRouter;