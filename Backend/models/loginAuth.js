"use strict"
const request = require('request');
// const secrets = require('./secrets');
const secrets = {
  reverbClientId: "cf2d29ab7c5d15add1a720db31c3fc813ba54f073156c046f136bf1b690c2943",
  reverbClientSecret: "fec256cf61a8797d3537c5816c532d0e714ec62688475a4dee0afe2903538cc2",
  twilioAccountSID: "ACae93953dc9cf108cfcf316c27b67514f",
  twilioAuthToken: "f6ac32262e73863ff7978427c4dbc3d9",
  twilioPhoneNumber: "+16156516990",
};

// get the authorization token
// add auth token to the header options object
// use auth otken for all subsequent requests

// If I allow for other users to register with the site,
// there will need to be a GET function that grabs the users
// info from the database and uses currentUser.clientId
// and currentUser.clientSecret as the variables in the
// function below, INSTEAD of requiring in the secrets.js
// file that I am using here right now

module.exports = () =>{
  return new Promise((resolve, reject)=>{
    let dataString = `grant_type=client_credentials&client_id=${secrets.reverbClientId}&client_secret=${secrets.reverbClientSecret}&scope=public+read_listings+read_orders+read_lists+write_lists+read_profile+write_profile`;

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
