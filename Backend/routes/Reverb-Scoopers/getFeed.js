const { Router } = require('express');
const feedRouter = Router();
// This file will mainly contain a function to grab the
// watched items ids and names from the url "https://reverb.com/my/feed/customize"

// it will get this data and send it to the 'getPrices' module

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

feedRouter.get('/', function (req, res) {
  // get req.body and it should have some data on it from the front end maybe?
  console.log('req.body',req.body);
});

exports = module.exports = feedRouter;