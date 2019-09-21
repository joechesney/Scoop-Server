"use strict"
const request = require('request');

module.exports = () => {
  const secrets = require('./secrets');

  return new Promise((resolve, reject)=>{
    let dataString = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=public+read_listings+read_orders+read_lists+write_lists+read_profile+write_profile`;

    let options = {
        url: 'https://reverb.com/oauth/token',
        method: 'POST',
        body: dataString
    };

    request(options, (error, response, html)=>{
      if (!error && response.statusCode == 200) {
        let bodyObj = JSON.parse(response.body);
        resolve(bodyObj);
      } else {
        reject(error)
      }
    });

  })
}
