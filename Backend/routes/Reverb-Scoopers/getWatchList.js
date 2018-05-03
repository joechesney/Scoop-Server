const { Router } = require('express');
const watchlistRouter = Router();
// This file will mainly contain a function to grab the
// watched items ids and names from the url "https://reverb.com/my/feed/customize"

// "/mywatchlist"

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const { loginAuth } = require("./_login");

watchlistRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  loginAuth().
  then(token=>{
    var getFeedOptions = {
      url: 'https://reverb.com/api/wants',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
        'Authorization': `Bearer ${token.access_token}`
      },
      "Content-Type": "application/hal+json",
      "Accept": "application/hal+json",
      "Accept-Version": "3.0",
    }
    request(getFeedOptions, (error, response2, html2)=>{
      response2 = JSON.parse(response2.body); //THIS WORKS!
      res.send(response2);
    })
  })
});

exports = module.exports = watchlistRouter;