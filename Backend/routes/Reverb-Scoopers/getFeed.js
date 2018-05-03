const { Router } = require('express');
const feedRouter = Router();

// "/myfeed"


const fs = require('fs');
const request = require('request');
const { loginAuth } = require("../../helpers/_login");


feedRouter.get('/', function (req, res) {
  // call the login function and it will send back the auth token
  loginAuth().
  then(token=>{
    var getFeedOptions = {
      url: 'https://reverb.com/api/my/feed',
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

exports = module.exports = feedRouter;