
const request = require('request');
// This returns just a list of the products on the specified list.
// The returned obects will not have the _embedded data on them yet
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
        response.body = JSON.parse(response.body); //THIS WORKS!
        resolve(response);
      } else {
        reject(error)
      }
    })
  })
}
