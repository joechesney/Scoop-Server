
const request = require('request');
const { determineSituation } = require('../helpers');

module.exports = (access_token, urlSuffix) => {
  return new Promise((resolve, reject) => {

    let options = {
      url: `https://reverb.com${urlSuffix}`,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
        'Authorization': `Bearer ${access_token}`
      },
      "Content-Type": "application/hal+json",
      "Accept": "application/hal+json",
      "Accept-Version": "3.0",
    }
    request(options, (error, response, html) => {
      if (!error && response) {
        listing = determineSituation(JSON.parse(response.body));
        resolve(listing);
      } else {
        let error = new Error("Something went wrong in getSingleProduct")
        reject(error)
      }
    })
  })
}
