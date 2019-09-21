"use strict"
const request = require('request');

module.exports = ({ endpoint, data }) => {
  const secrets = require('./secrets');
  const clientId = process.env.REVERB_CLIENT_ID || secrets.reverbClientId;
  const clientSecret = process.env.REVERB_CLIENT_SECRET || secrets.reverbClientSecret;
  return new Promise((resolve, reject)=>{
    let dataString = ``;

    let options = {
        url: `${secrets.firebaseUrl + endpoint + '.json'}`,
        method: 'PATCH',
        body: data
    };
    console.log('options : ', options);

    request(options, (error, response, html)=>{
      if (!error && response.statusCode == 200) {
        let bodyObj = JSON.parse(response.body);
        console.log('bodyObj : ', bodyObj);
        resolve(bodyObj);
      } else {
        console.log('error : ', error);
        reject(error)
      }
    });

  })
}
