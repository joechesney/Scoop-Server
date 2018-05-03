
const request = require('request');

module.exports.getAPIData = (accesss_token, url) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: 'https://reverb.com/api/my/feed',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
        'Authorization': `Bearer ${access_token}`
      },
      "Content-Type": "application/hal+json",
      "Accept": "application/hal+json",
      "Accept-Version": "3.0",
    }
    request(options, (error, response2, html2) => {
      response2 = JSON.parse(response2.body); //THIS WORKS!
      return response2;
    })
  })
}
