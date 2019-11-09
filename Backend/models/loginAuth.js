"use strict"
const request = require('request');

// get the authorization token
// add auth token to the header options object
// use auth otken for all subsequent requests

// If I allow for other users to register with the site,
// there will need to be a GET function that grabs the users
// info from the database and uses currentUser.clientId
// and currentUser.clientSecret as the variables in the
// function below, INSTEAD of requiring in the secrets.js
// file that I am using here right now

module.exports = async() => {
  // const { reverbClientId: clientId, reverbClientSecret: clientSecret } = require('./secrets');
  const clientId = process.env.REVERB_CLIENT_ID;
  const clientSecret = process.env.REVERB_CLIENT_SECRET;
  let dataString = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=public+read_listings+read_orders+read_lists+write_lists+read_profile+write_profile`;

  let options = {
      url: 'https://reverb.com/oauth/token',
      method: 'POST',
      body: dataString
  };

  return await request(options, (error, response, html) => {
    if(error) { throw(error) }
    let bodyObj = JSON.parse(response.body);
    return (bodyObj.access_token);
  });
}
