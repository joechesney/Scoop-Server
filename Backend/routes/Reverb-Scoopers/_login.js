"use strict"
const request = require('request');
const secrets = require('../../helpers/secrets');

// get the authorization token
// add auth token to the header options object
// use auth otken for all subsequent requests

module.exports.loginAuth = () =>{
  return new Promise((resolve, reject)=>{
    let b = request.jar();
    let dataString = `grant_type=client_credentials&client_id=${secrets.clientId}&client_secret=${secrets.clientSecret}&scope=public+read_listings+read_orders+read_lists+write_lists+read_profile+write_profile`;

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
