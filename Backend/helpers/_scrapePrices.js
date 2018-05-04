const request = require('request');
const cheerio = require('cheerio');

module.exports = (productUrl) => {
  var options = {
    url: `${productUrl}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
    }
  };
  try {
  request(options, function (error, response, html) {
    console.log('error: ',error);
    console.log('html: ',html);
    if (!error) {

      const $ = cheerio.load(html);
      // console.log('html:',html);
      let name, averageLow, averageHigh;
      // Finally, we'll define the variables we're going to capture
      let product = { name: "", averageLow: "", averageHigh: "" };

      $('.heading-1').filter(function(){
        var data = $(this);
        product.name = data.text();
      });

      // Gets Average Low and High Prices
      $('.inline-list.prices').filter(function(){
        var data = $(this);
        product.averageLow = data.children('.strong').children().first().text().replace("$", "");
        product.averageHigh = data.children('.strong').children().last().text().replace("$", "");
        product.averagePrice = ((+product.averageHigh+(+product.averageLow))/2);
      });


      // To write to the system we will use the built in 'fs' library.
      // In this example we will pass 3 parameters to the writeFile function
      // Parameter 1 :  output.json - this is what the created filename will be called
      // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
      // Parameter 3 :  callback function - a callback function to let us know the status of our function

      fs.writeFile('output.json', JSON.stringify(product, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
      });

      // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
      res.send(product);
    } else if(error) console.log('error:',error);// end of 'if'

  }); // end of request

  } catch (error) {
      console.log('error:',error);
  }
});
