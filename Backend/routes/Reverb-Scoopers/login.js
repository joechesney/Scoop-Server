
// https://reverb.com/signin

const request = require('request').defaults({jar:true});
const cheerio = require('cheerio');
const { Router } = require('express');
const loginRouter = Router();
const secrets = require('../../helpers/secrets');

// 3 Functions:
// get the authorization token
// add auth token to the header options object
// use auth otken for all subsequent requests

// "/api/my/wishlist"
// "/api/wants"

loginRouter.get("/", (req,res)=>{
  let b = request.jar();
  var dataString = `grant_type=client_credentials&client_id=${secrets.clientId}&client_secret=${secrets.clientSecret}&scope=public+read_listings+read_orders+read_lists+write_lists+read_profile+write_profile`;

  var options = {
      url: 'https://reverb.com/oauth/token',
      method: 'POST',
      body: dataString
  };

  request(options, (error, response, html)=>{
    var bodyObj = JSON.parse(response.body);
    console.log('bodyObj',bodyObj);

    if (!error && response.statusCode == 200) {
      var getFeedOptions = {
        url: 'https://reverb.com/api/my/feed',
        jar: b,
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
          'Authorization': `Bearer ${bodyObj.access_token}`
        },
        "Content-Type": "application/hal+json",
        "Accept": "application/hal+json",
        "Accept-Version": "3.0",
      }
      console.log('getFeedOptions',getFeedOptions);
      request(getFeedOptions, (error, response2, html2)=>{
        response2 = JSON.parse(response2.body); //THIS WORKS!
        console.log("RESPONSE2", response2);
        res.send(response2);
      })
    }
  });
})

module.exports = loginRouter;